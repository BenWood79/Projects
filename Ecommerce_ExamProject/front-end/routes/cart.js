var express = require("express");
var router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3002";

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const cart = data.data.result;
    res.render("cart", {
      cart: cart,
      title: "Cart",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
