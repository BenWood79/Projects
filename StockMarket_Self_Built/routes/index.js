var express = require("express");
var jsend = require("jsend");
var router = express.Router();
var db = require("../models");
var crypto = require("crypto");
var { promisify } = require("util");
var pbkdf2Async = promisify(crypto.pbkdf2);
var UserService = require("../services/UserServices");
var userService = new UserService(db);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "<h1>Stock Exchange</h1>",
    footer: "<h6>CTO: Benjamin Michael Harry Wood <br> \u00A9 2025 BISL</h6>",
  }); // \u00A9 = © in JavaScript, &copy; = html entity
});

/* GET login page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", {
    mainTitle: "<h1>Stock Exchange</h1>",
    title: "<h1>Sign Up</h1>",
    footer: "<h6>CTO: Benjamin Michael Harry Wood <br> \u00A9 2025 BISL</h6>",
  }); 
});

/* POST signup page. */
router.post("/signup", async function (req, res, next) {
  const { fullname, username, password } = req.body;

  if (fullname == null) {
    return res.status(400).send("Full name is required");
  }

  if (username == null) {
    return res.status(400).send("Username is required");
  }

  if (password == null) {
    return res.status(400).send("Password is required");
  }
  // If all fields are valid, proceed with user creation
  try {
    var salt = crypto.randomBytes(16);
    const hashedPassword = await pbkdf2Async(
      password,
      salt,
      310000,
      32,
      "sha256"
    );
    const RoleId = 2; // Default role ID for regular users
    const user = await userService.createUser(
      fullname,
      username,
      hashedPassword,
      salt,
      RoleId
    );
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
