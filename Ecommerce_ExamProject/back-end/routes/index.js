var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var crypto = require('crypto');
var { promisify } = require('util');
var ProductsService = require('../services/ProductService');
var productService = new ProductsService(db);
var RolesService = require('../services/RolesService');
var rolesService = new RolesService(db)
var MembershipService = require('../services/MembershipService')
var membershipService = new MembershipService(db);
var UserService = require("../services/UserService")
var userService = new UserService(db);
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var jwt = require('jsonwebtoken')

router.use(jsend.middleware);

/* GET home page. */
/*Simple test to see whether the back-end is online*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EP1 Exam Project: E-Commerce API', user: req.user?.username });
});

// Initialize the database
router.post('/init', async (req, res, next) => {
  try{
      //Populate membership table
      //Debugged using Copilot
      const memberships = [
        { name: 'Bronze', discount: 0 },
        { name: 'Silver', min: 15, max: 30, discount: 15 },
        { name: 'Gold', min: 30, discount: 30 },
      ];
      for (const membership of memberships) {
        await membershipService.createMembership(membership);
      }
      //Populate roles table
      //Debugged using Copilot
      const roles = [
        { id: 1, admin: 'Admin', user: null },
        { id: 2, admin: null, user: 'User' },
      ];
      for (const role of roles) {
        await rolesService.createRoles(role.id, role.admin, role.user);
      }
      
      const password = 'P@ssword2023';
      const salt = crypto.randomBytes(16);
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');
      const defaultMembership = 1;
      //Create an initial Admin user   
      const adminuser = {
        firstname: 'Admin',
        lastname: 'Support',
        username: 'Admin',
        email: 'admin@noroff.no',
        address: 'Online',
        telephone: 911,
        encryptedPassword: hashedPassword,
        salt: salt,
        RoleId: 1,
        defaultMembership 
      };
      await userService.createAdminUser(//Refactored using Copilot
        adminuser.firstname,
        adminuser.lastname,
        adminuser.username,
        adminuser.email,
        adminuser.address,
        adminuser.telephone,
        adminuser.encryptedPassword,
        adminuser.salt,
        adminuser.RoleId,
        adminuser.defaultMembership
      );
      
      //Populate products table in database
      //Fetch data from Noroff API
      const noroffApi = await fetch('http://backend.restapi.co.za/items/products');
      if (!noroffApi.ok) throw new Error ('Failed to fetch data from Noroff API');

      const jsonData = await noroffApi.json();
      const data = jsonData.data;
      for (const item of data) {
        await productService.createTableContent(//Refactored using Copilot
            item.id,
            item.category,
            item.brand,
            item.imgurl,
            item.name,
            item.description,
            item.price,
            item.quantity,
            item.date_added,
            item.deleted || false,
        )
      } 
      res.status(200).json({ message: 'Data saved to database successfully'}); 
  } catch (error) {
      console.error('Error saving data to database:', error);
      res.status(500).json({ message: 'Failed to save data to database', error: error.message });
  }
});

//Debugged with Copilot
router.post("/login", jsonParser, async (req, res, next) => {
  const { username, password } = req.body;
  if (username == null) {
    return res.jsend.fail({"username": "username is required."});
  }
  if (password == null) {
    return res.jsend.fail({"password": "Password is required."});
  }
  userService.getOne(username).then((data) => {
      if(data === null) {
          return res.jsend.fail ({ message: "Incorrect username or password (at userService)"});
      }
      crypto.pbkdf2(password, data.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return res.jsend.fail(err); }
        
        if (data.encryptedPassword.length !== hashedPassword.length) {
          console.log('Hash length mismatch!');
          return res.jsend.fail({ message: "Password hash length mismatch." });
        }
        if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
          console.log('Hash mismatch!');
          return res.jsend.fail({ message: "Incorrect username or password (at timingSafeEqual)" });
        }

          req.session.user = {
          id: data.id,
          username: data.username,
          role: data.Role?.admin || data.Role?.user
        };

        if (username){
        let token;
        try {
          token = jwt.sign(
            { id: data.id, username: data.username },
            process.env.TOKEN_SECRET,
            { expiresIn: "2h" }
          );
        } catch (err) {
          res.jsend.error("Something went wrong with creating JWT token")
        }

        return res.json({
          result: "You are logged in as: ", 
          id: data.id, 
          username: data.username, 
          role: data.Role?.admin || data.Role?.user,
          token: token
        });
      }
    });      
  });
});

router.get('/logout', async (req, res, next) => {
  res.jsend.success( { message: "Logged out" });
});

module.exports = router;
