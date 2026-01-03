var express = require("express");
var router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3002";

router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    const categories = data.data.result;
    res.render("categories", {
      categories: categories,
      title: "Catergories",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
