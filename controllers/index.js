var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js');
 
var dashboard = require('./dashboard.js')
var login = require('./login.js');
var search = require('./search.js');
var createListing = require('./createListing.js');
var about = require('./about.js');
var everyListing = require('./everyListing.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hi");
    res.render('index');
});

router.use('/login', login);
router.use('/everyListing',everyListing);
router.use('/search',search); 
router.use('/dashboard', dashboard);
router.use('/search', search);
router.use('/createListing', createListing);
router.use('/about', about);

module.exports = router;