var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const response = await fetch("/api/membership", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    const membership = data.data.result;
    res.render("membership", {
      membership: membership,
      title: "Memberships",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("error", { message: "Could not fetch memberships", error: err });
  }
});

module.exports = router;
