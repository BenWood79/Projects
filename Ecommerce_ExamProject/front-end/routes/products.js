var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.decode(token);
    const productsResponse = await axios.get("http://localhost:3002/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const productsData = productsResponse.data;
    const products = productsData.data.result;

    let membershipName = "";
    let user = null;
    if (decoded && decoded.id) {
      const userResponse = await axios.get(
        `http://localhost:3002/users/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error(`Failed to fetch user: ${userResponse.status}`);
      }
      const userData = userResponse.data;

      membershipName = userData.data.result.membershipName;

      user = { id: decoded.id, username: decoded.username, membershipName };
    }
    const response = await axios.get(
      "http://backend.restapi.co.za/items/products"
    );
    const jsonData = response.data;
    res.render("products", {
      products,
      title: "Products",
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
