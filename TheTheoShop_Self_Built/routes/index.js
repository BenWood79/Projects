var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: "Theo's 3D Shop",
    header: "<h1 style=color:orange>Welcome to Theo's 3D Shop</h1>",
    footer: "<h3 style=color:orange>© 2025 BISL ltd. All rights reserved.\n<h2 style=color:orange>CTO: Benjamin Michael Harry Wood</h2>",
   });
});

router.get('/products', function(req, res, next) {
  res.render('products', { 
    title: "Theo's 3D Shop",
    header: "<h1 style=color:orange>Our Products</h1>",
    footer: "<h3 style=color:orange>© 2025 BISL ltd. All rights reserved.\n<h2 style=color:orange>CTO: Benjamin Michael Harry Wood</h2>",
   });
});

/*router.get('/login', function(req, res, next) {
  res.render('login', { title: "Theo's 3D Shop" });
});*/

module.exports = router;
