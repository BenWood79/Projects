var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'E-Commerce Website' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Log In' });
});

router.post('/login', async (req, res, next) => {
  
  if (userIsAuthenticated) {
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    return res.redirect('/');
  } else {
    return res.render('login', { title: 'Log In', error: 'Invalid credentials' });
  }
});

module.exports = router;
