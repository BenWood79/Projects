var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3002";

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.decode(token);
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    let orders;

    if (decoded.username === "Admin") {
      orders = data.data.result;
    } else {
      orders = data.data.result.filter((order) => order.userId === decoded.id);
    }

    res.render("orders", {
      orders,
      user: { id: decoded.id, username: decoded.username },
      title: "Orders",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("error", { message: "Could not fetch orders", error: err });
  }
});

router.post("/:userId/membership", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { membershipName } = req.body;

    const { userId } = req.params;

    await fetch(`${API_BASE_URL}/orders/${userId}/membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ membershipName }),
    });
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
