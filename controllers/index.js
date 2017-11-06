var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 

var login = require('./login.js');
var search = require('./search.js'); 

var isAuthenticated; 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/login', login);
router.use('/search',search); 

module.exports = router;
