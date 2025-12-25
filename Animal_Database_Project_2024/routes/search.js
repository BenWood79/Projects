var express = require("express");
var router = express.Router();
var AnimalService = require("../services/AnimalService");
var animalService = new AnimalService(db);
var db = require("../models");
const { QueryTypes } = require("sequelize");
var { viewDetails, isAdmin, isMember } = require("./authMiddleware");

router.post("/search", async (req, res) => {
  const searchTerm = req.body.search;
  const animals = await animalService.searchAnimals(searchTerm);
  res.render("animals", { animals, user: req.user }); // Render your animals page with filtered results
});

module.exports = router;