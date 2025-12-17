var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var ProductService = require('../services/ProductService');
var productService = new ProductService(db);

router.use(jsend.middleware);

router.get('/', async (req, res, next) => {
    const brands = await productService.getAllProducts();
    if (!brands || brands.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: brands })
});

router.get('/apple', async (req, res, next) => {
    const appleBrands = await productService.getAppleBrands('Apple');
    if (!appleBrands || appleBrands.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: appleBrands})
});

router.get('/samsung', async (req, res, next) => {
    const samsungBrands = await productService.getSamsungBrands('Samsung');
    if (!samsungBrands || samsungBrands.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: samsungBrands})
});

router.get('/xiaomi', async (req, res, next) => {
    const xiaomiBrands = await productService.getXiaomiBrands('Xiaomi');
    if (!xiaomiBrands || xiaomiBrands.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: xiaomiBrands})
});

router.get('/mxq', async (req, res, next) => {
    const mxqBrands = await productService.getMxqBrands('MXQ');
    if (!mxqBrands || mxqBrands.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", products: [] })
    }
    res.jsend.success({ statusCode: 200, result: mxqBrands})
});

router.post('/add', async (req, res, next) => {
  const { brand, productId  } = req.body;
  await productService.updateBrand(brand, productId);
  return res.jsend.success({ statusCode: 200, result: { brand, id: productId  }})
});

module.exports = router;