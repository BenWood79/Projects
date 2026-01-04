var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var UserService = require("../services/UserService");
var userService = new UserService();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await userService.getOneByName(username);
      if (!user) {
        return cb(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        // In production, use hashed passwords!
        return cb(null, false, { message: "Incorrect password." });
      }
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, role: user.role });
  });
});

passport.deserializeUser(async function (user, cb) {
  try {
    const dbUser = await userService.getOne(user.id);
    cb(null, dbUser);
  } catch (err) {
    cb(err);
  }
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", async function (req, res, next) {
  try {
    await userService.create(
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.password
    );
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
