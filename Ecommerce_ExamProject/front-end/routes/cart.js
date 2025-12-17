var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    const response = await fetch("http://localhost:3002/cart", {
      headers: { 
        Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    const cart = data.data.result;
    res.render("cart", {
      cart: cart,
      title: "Cart"
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

