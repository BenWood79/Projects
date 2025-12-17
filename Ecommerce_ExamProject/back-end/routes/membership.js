var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var MembershipService = require('../services/MembershipService');
var membershipService = new MembershipService(db);

router.use(jsend.middleware);

// GET membership page. 
router.get('/', async function(req, res, next) {
  const membership = await membershipService.getAll();
  if (!membership || membership.length == 0){
    return res.jsend.error({ statusCode: 404, message: "Memberships not found" })
  }
  res.jsend.success({ statusCode: 200, result: membership })
});

module.exports = router;