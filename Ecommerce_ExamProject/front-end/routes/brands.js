var express = require("express");
var router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3002";

router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`);
    const data = await response.json();
    const brands = data.data.result;
    res.render("brands", {
      brands: brands,
      title: "Brands",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
