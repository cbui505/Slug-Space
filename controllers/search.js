var express = require('express');
var router = express.Router();
var listings = require('../models/listings.js');
router.get('/',function(req,res,next){
    res.render('search');
});

router.get('/allListings',function(req,res,next){
    var sendListings = function(allListings){
        if(allListings){ 
            res.send(allListings); 
        } else {
            console.error("listings is undefined");
        }
    }
    listings.getUserListings(sendListings); 
});

module.exports = router; 