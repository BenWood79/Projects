var express = require("express");
var router = express.Router();
var AnimalService = require("../services/AnimalService");
var animalService = new AnimalService();
var { viewDetails, isAdmin, isMember } = require("./authMiddleware");

router.get("/", async function (req, res, next) {
  try {
    const animals = await animalService.getAllAnimals();
    res.render("animals", { user: req.user || null, animals: animals });
  } catch (err) {
    console.error("Error getting animals:", err);
    next(err);
  }
});

router.get("/all", async function (req, res, next) {
  try {
    const animals = await animalService.getAllAnimals();
    res.json(animals);
  } catch (err) {
    next(err);
  }
});

router.get("/popular_names", async function (req, res, next) {
  try {
    const popularNames = await animalService.getPopularNames();
    res.json(popularNames);
  } catch (err) {
    next(err);
  }
});

router.get("/age", async function (req, res, next) {
  try {
    const animals = await animalService.getAgeOfAllAnimals();
    res.json(animals);
  } catch (err) {
    next(err);
  }
});

router.get("/size", async function (req, res, next) {
  try {
    const animals = await animalService.getSizeOfAllAnimals();
    res.json(animals);
  } catch (err) {
    next(err);
  }
});

router.get("/date-range", async function (req, res, next) {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ error: "start and end query params required" });
    }
    const animals = await animalService.dateRange(start, end);
    res.json(animals);
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  let AnimalId = req.body.AnimalId;
  let PostType = req.body.PostType;
  if (PostType == "adopt") {
    await animalService.adopted(AnimalId);
    res.end();
  }
  if (PostType == "cancelAdoption") {
    await animalService.cancelAdoption(AnimalId);
    res.end();
  }
});

// Adopt an animal
router.post("/adopt", async function (req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Not logged in" });
  const { animalId } = req.body;
  try {
    await animalService.adoptAnimal(req.user.id, animalId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Cancel adoption
router.post("/cancel-adoption", async function (req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Not logged in" });
  const { animalId } = req.body;
  try {
    await animalService.cancelAdoption(animalId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
