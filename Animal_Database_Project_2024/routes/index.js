var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();
var db = require('../models');
var { QueryTypes, Sequelize } = require('sequelize');
var fs = require('fs');
sequelize = require('sequelize');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { user: req.user, req});
});

router.get('/login', function (req, res, next) {
  res.render('login', {  user: req.user });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { user: req.user });
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/', async (req, res, next) => {
  if (await CheckIfDBHasData()) {
    console.log('Data exists, no records added.');
  } else {
    console.log('No records in the tables, adding data...');
    await InsertData('users.json');
    await InsertData('animals.json');
    await InsertData('species.json');
    await InsertData('temperaments.json');
  }
  res.end();
});

const InsertData = async (filename) => {
  const { records } = await JSON.parse(fs.readFileSync('./public/json/' + filename));
  console.log(records);
  records.forEach(async (record) => {
    let result = await db.sequelize.query(record.query, {
      raw: true,
      type: QueryTypes.INSERT,
    });
  });
};

async function CheckIfDBHasData() {
  let result = await db.sequelize.query('SELECT COUNT(*) as total FROM animals', {
    raw: true,
    type: QueryTypes.SELECT,
  });
  let users = await db.sequelize.query('SELECT COUNT(*) as total FROM users', {
    raw: true,
    type: QueryTypes.SELECT,
  });
  let species = await db.sequelize.query('SELECT COUNT(*) as total FROM species', {
    raw: true,
    type: QueryTypes.SELECT,
  });
  let temperaments = await db.sequelize.query('SELECT COUNT(*) as total FROM temperaments', {
    raw: true,
    type: QueryTypes.SELECT,
  });
  if (result[0].total + users[0].total + species[0].total + temperaments[0].total > 0 ) {
    return true;
  } else {
  return false;
  }
}

module.exports = router;