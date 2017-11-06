var express = require('express');
var router = express.Router();
var listings = require('../models/listings.js');
router.get('/',function(req,res,next){
    res.render('search');
});

router.get('/allListings', function(req,res,next){
    var getAllListings = function(listingArray){
        console.log(listingsArray); 
    }
    listings.getUserListings(getAllListings); 
});

module.exports = router; 