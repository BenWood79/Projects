var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const response = await fetch("/api/users", {
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
