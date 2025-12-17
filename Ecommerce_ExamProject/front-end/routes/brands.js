var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const response = await fetch('http://localhost:3002/brands');
    const data = await response.json();
    const brands = data.data.result
    res.render('brands', { 
    brands: brands, 
    title: 'Brands'
  });
  }catch (err) {
    console.log(err);
  }
});

module.exports = router;