var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 

var login = require('./login.js');
var search = require('./search.js'); 
var createListing = require('./createListing.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/login', login);
router.use('/createListing', createListing);
router.use('/search',search); 


module.exports = router;
