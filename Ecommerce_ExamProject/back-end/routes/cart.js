var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var CartService = require('../services/CartService');
var cartService = new CartService(db);
var ProductService = require('../services/ProductService');
var productService = new ProductService(db);
var OrdersService = require('../services/OrdersService');
var ordersService = new OrdersService(db);
const authenticateToken = require('../middleware/middleware')

router.use(jsend.middleware);

router.get('/', async (req, res, next) => {
    const cart = await cartService.getAll()
    res.jsend.success({ statusCode: 200, result: cart })
})

function generateOrderNumber() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        let orderNumber = '';
        for (let i = 0; i < 8; i++) {
            orderNumber += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return orderNumber;
        }

router.post('/checkOut', authenticateToken, async (req, res, next) => {
  const userId = req.user.id;
  const cartItems = await cartService.getAll();
  if(!cartItems.length) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }  
  const orderNumber = generateOrderNumber();
  const status = 'In Progress'  
  for (const item of cartItems) {
    await ordersService.create({
      orderNumber: orderNumber,
      status: status,
      imgurl: item.imgurl,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      userId: item.userId,
      productId: item.productId,
    })
  }
  await db.Carts.destroy({ where: { userId }});
  res.json({ success: true, message: "Order placed" })
})

function sqlDate (dateToString) {
    const date = new Date(dateToString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

router.post('/add', authenticateToken, async (req, res, next) => {
  console.log('Session at /cart/add:', req.id);
    const product = req.body;
    const userId = req.user.id;
    
    const dbProduct = await productService.findOne(product.id);
    if(dbProduct.quantity <= 0) {
      return res.status(400).json({  success: false, message: "Product out of stock" });
    }
    if (!userId) {
      return res.status(401).json({ success: false, message: "You must be logged in to add to cart" });
    }
    if(dbProduct.deleted) {
      return res.status(400).json({ success: false, message: "Product is deleted" });
    }
    const date_added = sqlDate(product.date_added);
    await cartService.addOrIncrement(//Refactored using Copilot
            product.id,
            product.category,
            product.brand,
            product.imgurl,
            product.name,
            product.description,
            product.price,
            1,
            date_added,
            product.deleted,
            userId,
            product.id 
        );

    await db.Products.decrement('quantity', { by: 1, where: {id: product.id } });
    res.jsend.success({ statusCode: 200 });
})

router.put('/:itemId/quantity', async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const result = await cartService.updateQuantity(itemId, Number(quantity));
  res.jsend.success({ statuCode: 200, result: result })
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const item = await cartService.deleteItem(id);
  res.jsend.success({ statuCode: 200, result: item })
})



module.exports = router;