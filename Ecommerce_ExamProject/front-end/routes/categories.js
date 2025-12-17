var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const response = await fetch('http://localhost:3002/categories');
    const data = await response.json();
    const categories = data.data.result
    res.render('categories', { 
      categories: categories, 
      title: 'Catergories'
    });
  }catch (err) {
    console.log(err);
  }
});

module.exports = router;