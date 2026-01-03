var express = require("express");
var router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3002";

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const users = data.data.result;
    res.render("users", {
      users: users,
      title: "Users",
    });
  } catch (err) {
    res
      .status(500)
      .render("error", { message: "Could not fetch users", error: err });
  }
});

module.exports = router;
