var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var ProductService = require('../services/ProductService');
var productService = new ProductService(db);

router.use(jsend.middleware);

router.get('/', async (req, res, next) => {
    const categories = await productService.getAllProducts();
    if (!categories || categories.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: categories})
});

router.get('/phones', async (req, res, next) => { 
    const allPhones = await productService.getAllPhones('Phones');
    if (!allPhones || allPhones.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: allPhones})
});

router.get('/tvs', async (req, res, next) => {
    const tvs = await productService.getAllTvs('TVs');
    if (!tvs || tvs.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: tvs})
});

router.get('/watches', async (req, res, next) => {
    const allWatches = await productService.getAllWatches('Watches');
    if (!allWatches || allWatches.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: allWatches})
});

router.get('/desktops', async (req, res, next) => {
    const allDesktops = await productService.getAllDesktops('Desktops');
    if (!allDesktops || allDesktops.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: allDesktops})
});

router.get('/laptops', async (req, res, next) => {
    const allLaptops = await productService.getAllLaptops('Laptops');
    if (!allLaptops || allLaptops.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: allLaptops})
});

router.get('/tablets', async (req, res, next) => {
    const allTablets = await productService.getAllTablets('Tablets');
    if (!allTablets || allTablets.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: allTablets})
});

router.post('/add', async (req, res, next) => {
  const { category, productId  } = req.body;
  await productService.updateCategory(category, productId);
  return res.jsend.success({ statusCode: 200, result: { category, id: productId  }})
});

module.exports = router;