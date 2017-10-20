var express = require('express');
var router = express.Router();

var home = require('./home/home_routes');
var search = require('./search/search_routes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('./home/');
});


router.use('/home', home);
router.use('/search',search); 

module.exports = router;
