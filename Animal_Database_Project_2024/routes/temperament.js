var express = require("express");
var router = express.Router();
var AnimalService = require("../services/AnimalService");
var animalService = new AnimalService();
var { isAdmin } = require("./authMiddleware");

router.get("/", isAdmin, async function (req, res, next) {
  if (req.user.role !== "admin") {
    return res.redirect("/?error=permission");
  }
  const temperaments = await animalService.getAllTemperaments();
  res.render("temperament", { user: req.user, temperaments: temperaments });
});

router.post("/temperament", isAdmin, async function (req, res, next) {
  let Id = req.body.Id;
  let TemperamentInput = req.body.TemperamentInput;
  let PostType = req.body.PostType;
  if (PostType == "updateTemperament") {
    await animalService.editTemperament(Id, TemperamentInput); // Pass both!
    res.end();
  }
});

router.delete("/", isAdmin, async function (req, res, next) {
  let DeleteTemp = req.body.DeleteTemp;
  let PostType = req.body.PostType;
  if (PostType === "deleteTemp") {
    await animalService.delTemp(DeleteTemp);
    res.end();
  }
});

module.exports = router;
