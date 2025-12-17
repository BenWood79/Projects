var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var OrdersService = require('../services/OrdersService');
var ordersService = new OrdersService(db);


router.use(jsend.middleware);

router.get('/', async (req, res, next) => {
   const orders = await ordersService.getAll();
   res.jsend.success({ statusCode: 200, result: orders })
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const deleted = await ordersService.deleteOrder(id);
  if(deleted) {
    res.jsend.success({ statuCode: 200, result: deleted })
  } else {
    res.jsend.error({ statusCode: 404, result: "Failed to delete order" })
  }
})

//----------------Initialized using Copilot (lines 27 - 38)-------------------//
router.post('/:userId/membership', async (req, res) => {
  try {
    const { membershipName } = req.body;
    const { userId } = req.params;
    const updated = await ordersService.updateUserMembership(userId, membershipName);
    if (!updated) return res.status(400).jsend.error({ message: 'Membership not updated' });
    res.jsend.success({ result: updated });
  } catch (err) {
    console.error(err);
    res.status(500).jsend.error({ message: "Could not update membership", error: err });
  }
});

module.exports = router;