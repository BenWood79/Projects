var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var ProductService = require('../services/ProductService');
var productService = new ProductService(db);

router.use(jsend.middleware);

router.get('/', async (req, res, next) =>{
    const product = await productService.getAllProducts();
    if (!product || product.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No products found", product: [] })
    }
    res.jsend.success({ statusCode: 200, result: product });
});

router.get('/search', async (req, res, next) => {
  const searchTerm = req.query.q;
  const result = await productService.search(searchTerm);
  res.jsend.success({ statusCode: 200, result: result })
})

router.put('/:id', async (req, res, next) =>{
  try {
    const updatedProduct = { ...req.body, id: req.params.id };
    const updated = await productService.update(updatedProduct);
    if (updated) {
      res.status(200).json({ message: 'Product updated' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.put('/softDelete/:id', async (req, res, next) => {
  const id = req.params.id;
  const { deleted } = req.body;
  await productService.softDelete(id, deleted);
  res.jsend.success({ statusCode: 200, result: { id, deleted } });
});

//-----------------UNIT TESTING PURPOSES----------------------//

router.post('/add', async (req, res, next) => {

  const { 
    productId, 
    category, 
    brand, 
    imgurl,
    name, 
    description, 
    price, 
    quantity, 
    date_added, 
    deleted 
  } = req.body;

  await productService.create(
    productId, 
    category, 
    brand, 
    imgurl,
    name, 
    description, 
    price, 
    quantity, 
    date_added, 
    deleted 
  );

  return res.jsend.success({ statusCode: 200, result: {
    id: productId, 
    category, 
    brand, 
    imgurl,
    name, 
    description, 
    price, 
    quantity, 
    date_added, 
    deleted 
  }});
})

router.get('/:name', async (req, res, next) => {
  const product = await productService.getProductByName(req.params.name);
  if(!product){
    return res.jsend.error({ statusCode: 404, message: "Product not found" });
  }
  res.jsend.success({ statusCode: 200, result: product })
})

router.put('/category', async (req, res, next) => {
  try {
  const category = await productService.updateCategoryName(req.params.category);
  if(!category){
    return res.jsend.error({ statusCode: 404, message: "Something went wrong, category not updated" });
  }
  res.jsend.success({ statusCode: 200, result: category })
  } catch (err) {
    console.error('PUT /products/:category error:', err);
    res.status(500).json({ error: err, message: 'Server error' });
  }
})

router.put('/brand', async (req, res, next) => {
  try {
  const brand = await productService.updateBrandName(req.params.brand);
  if(!brand){
    return res.jsend.error({ statusCode: 404, message: "Something went wrong, brand not updated" });
  }
  res.jsend.success({ statusCode: 200, result: brand })
  } catch (err) {
    console.error('PUT /products/:brand error:', err);
    res.status(500).json({ error: err, message: 'Server error' });
  }
})

router.delete('/product', async (req, res, next) => {
  const deleteProduct = await productService.deleteProduct(req.params.brand);
})

module.exports = router;