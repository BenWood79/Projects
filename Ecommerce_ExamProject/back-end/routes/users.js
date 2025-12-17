var express = require('express');
var router = express.Router();
var db = require('../models');
var jsend = require('jsend');
var UserService = require('../services/UserService');
var userService = new UserService(db);


router.use(jsend.middleware);

router.get('/', async (req, res, next) => {
    const users = await userService.getAllUsers();
    if (!users || users.length == 0){
      return res.jsend.error({ statusCode: 404, result: "No users found", users: [] })
    }
    res.jsend.success({ statusCode: 200, result: users })
});

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.getMembership(userId);
  res.jsend.success({ statusCode: 200, result: user });
});

router.put('/:id', async (req, res, next) =>{
  try {
    const updatedUser = { ...req.body, id: req.params.id };
    const updated = await userService.update(updatedUser);
    if (updated) {
      res.status(200).json({ message: 'User updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const user = await userService.deleteUser(id);
  if(user) {
    res.jsend.success({ statuCode: 200, result: user })
  } else {
    res.jsend.error({ statusCode: 404, result: "Failed to delete user" })
  }
})

module.exports = router;