var express = require("express");
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var crypto = require("crypto");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var { promisify } = require("util");
var pbkdf2Async = promisify(crypto.pbkdf2);
var bodyParser = require("body-parser");
var IndexServices = require("../services/IndexServices");
var indexService = new IndexServices(db);
var jwt = require("jsonwebtoken");

router.use(jsend.middleware);

router.get("/", (req, res, next) => {
  res.render("index", { 
    title: "GoldmedAL", 
  });
});

router.get("/login", (req, res, next) => {
  res.render("login", { 
    title: "GoldmedAL", 
  });
});

router.get("/signup", (req, res, next) => {
  res.render("signup", { 
    title: "GoldmedAL", 
  });
});
router.get("/ukraina/ukDno", (req, res, next) => {
  res.render("ukDno", { 
    title: "GoldmedAL", 
  });
});

router.get("/ukraina/ukEik", (req, res, next) => {
  res.render("ukEik", { 
    title: "GoldmedAL", 
  });
});

router.get("/kurs", (req, res, next) => {
  res.render("kurs", {
     title: "Kurs"
  });
});

router.get("/omoss", (req, res, next) => {
  res.render("omOss");
});

router.get("/tjenester", (req, res, next) => {
  res.render("tjenester");
});

router.get("/ukraina", (req, res, next) => {
  res.render("ukraina");
});

router.get("/users", async (req, res, next) => {
  const users = await indexService.getAllUsers();
  if (!users) {
    return res.jsend.fail({ message: "No users found." });
  }
  res.render("respond with a resource", {
    title: "Users",
    users: users,
  });
});

router.post("/login", jsonParser, async (req, res, next) => {
  const { username, password } = req.body;
  if (username == null) {
    return res.jsend.fail({ username: "username is required." });
  }
  if (password == null) {
    return res.jsend.fail({ password: "Password is required." });
  }
  indexService.getOne(username).then((data) => {
    if (data === null) {
      return res.jsend.fail({
        message: "Incorrect username or password (at indexService)",
      });
    }
    crypto.pbkdf2(
      password,
      data.salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return res.jsend.fail(err);
        }

        if (data.encryptedPassword.length !== hashedPassword.length) {
          console.log("Hash length mismatch!");
          return res.jsend.fail({ message: "Password hash length mismatch." });
        }
        if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
          console.log("Hash mismatch!");
          return res.jsend.fail({
            message: "Incorrect username or password (at timingSafeEqual)",
          });
        }

        req.session.user = {
          id: data.id,
          username: data.username,
          role: data.Role?.admin || data.Role?.user,
        };

        if (username) {
          let token;
          try {
            token = jwt.sign(
              { id: data.id, username: data.username },
              process.env.TOKEN_SECRET,
              { expiresIn: "2h" }
            );
          } catch (err) {
            res.jsend.error("Something went wrong with creating JWT token");
          }

          return res.json({
            result: "You are logged in as: ",
            id: data.id,
            username: data.username,
            role: data.Role?.admin || data.Role?.user,
            token: token,
          });
        }
      }
    );
  });
});

router.get("/logout", async (req, res, next) => {
  res.jsend.success({ message: "Logged out" });
});

router.post("/signup", async (req, res, next) => {
  const { firstname, lastname, username, email, address, telephone, password } =
    req.body;

  if (firstname == null) {
    return res.jsend.fail({ statuscode: 400, name: "First name is required." });
  }
  if (lastname == null) {
    return res.jsend.fail({ statuscode: 400, name: "Last name is required." });
  }
  if (username == null) {
    return res.jsend.fail({ statuscode: 400, name: "Username is required." });
  }
  if (email == null) {
    return res.jsend.fail({ statuscode: 400, name: "Email is required." });
  }
  if (address == null) {
    return res.jsend.fail({ statuscode: 400, name: "Address is required." });
  }
  if (telephone == null) {
    return res.jsend.fail({
      statuscode: 400,
      name: "Telephone number is required.",
    });
  }
  if (password == null) {
    return res.jsend.fail({ statuscode: 400, name: "Password is required." });
  }

  var user = await indexService.getOne(email);
  if (user != null) {
    return res.jsend.fail({
      statuscode: 400,
      email: "Provided email is already in use",
    });
  }

  try {
    //Refactored using Copilot
    var salt = crypto.randomBytes(16);
    const hashedPassword = await pbkdf2Async(
      password,
      salt,
      310000,
      32,
      "sha256"
    );
    const RoleId = 2;
    await indexService.create(
      firstname,
      lastname,
      username,
      email,
      address,
      telephone,
      hashedPassword,
      salt,
      RoleId
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
