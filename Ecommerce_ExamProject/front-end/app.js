var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");

var brandsRouter = require("./routes/brands");
var cartRouter = require("./routes/cart");
var categoriesRouter = require("./routes/categories");
var indexRouter = require("./routes/index");
var membershipRouter = require("./routes/memberships");
var productsRouter = require("./routes/products");
var ordersRouter = require("./routes/orders");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use("/api", proxy("http://localhost:3002"));

console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      res.locals.user = user;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

app.use("/brands", brandsRouter);
app.use("/cart", cartRouter);
app.use("/categories", categoriesRouter);
app.use("/", indexRouter);
app.use("/membership", membershipRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
