var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var crypto = require('crypto');
var { promisify } = require('util');
var pbkdf2Async = promisify(crypto.pbkdf2);
var UserService = require("../services/UserService")
var userService = new UserService(db);

var jwt = require('jsonwebtoken')

router.use(jsend.middleware);

router.post("/register", async (req, res, next) => {
  const { firstname, lastname, username, email, address, telephone, password } = req.body;

  if (firstname == null){
    return res.jsend.fail({"statuscode": 400, "name": "First name is required."});
  }
  if (lastname == null){
    return res.jsend.fail({"statuscode": 400, "name": "Last name is required."});
  }
  if (username == null){
    return res.jsend.fail({"statuscode": 400, "name": "Username is required."});
  }
  if (email == null){
    return res.jsend.fail({"statuscode": 400, "name": "Email is required."});
  }
  if (address == null){
    return res.jsend.fail({"statuscode": 400, "name": "Address is required."});
  }
  if (telephone == null){
    return res.jsend.fail({"statuscode": 400, "name": "Telephone number is required."});
  }
  if (password == null){
    return res.jsend.fail({"statuscode": 400, "name": "Password is required."});
  }

  var user = await userService.getOne(email);
  if (user != null){
    return res.jsend.fail({"statuscode": 400, "email": "Provided email is already in use"})
  }

  try {//Refactored using Copilot
    var salt = crypto.randomBytes(16);
    const hashedPassword = await pbkdf2Async(password, salt, 310000, 32, 'sha256');
    const RoleId = 2;
    await userService.create(
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
    res.redirect('http://localhost:3002/?signup=success');
  } catch (err) {
    next(err);
  }
});

module.exports = router;