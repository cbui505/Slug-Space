var express = require('express');
var create = require('../middlewares/sendListing.js');
var bodyParser = require('body-parser').json(); 
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('createListing');
});

/* send the data to the middleware, which will send to models */
router.post('/sendListing',function(req,res,next){
    //debug
    console.log("made it here");
    //get the listing data from client side, pass to middleware
    var listing = req.body;
    console.log(listing);
    create.sendListing(listing);
});

router.post('/getListing',function(req,res,next){
    //debug
    console.log("on route to getting those listings");
    //our callback function
    var allListings = function(data){
        console.log("The data you got back was ", data);
    };
    //get the listing data from client side, pass to middleware
    create.getListings(allListings);
});

module.exports = router; 

