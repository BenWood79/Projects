var express = require("express");
var router = express.Router();
var AnimalService = require("../services/AnimalService");
var animalService = new AnimalService();
var { isAdmin } = require("./authMiddleware");

router.get("/", isAdmin, async function (req, res, next) {
  const species = await animalService.getAllSpecies();
  res.render("species", { user: req.user, species: species });
});

router.post("/species", isAdmin, async function (req, res, next) {
  let Id = req.body.Id;
  let SpeciesInput = req.body.SpeciesInput;
  let PostType = req.body.PostType;
  if (PostType == "updateSpecies") {
    await animalService.editSpecies(Id, SpeciesInput); // Pass both ID and new name
    res.end();
  }
});

router.delete("/", isAdmin, async function (req, res, next) {
  let DeleteSpec = req.body.DeleteSpec;
  let PostType = req.body.PostType;
  if (PostType === "deleteSpec") {
    await animalService.delSpec(DeleteSpec);
    res.end();
  }
});

module.exports = router;
