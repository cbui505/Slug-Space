var express = require('express');
var create = require('../middlewares/sendListing.js');
 
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('createListing');
});

//send the data to the middleware, which will send to models
router.post('/sendListing',function(req,res,next){
    //debug
    console.log("made it here");
    //get the listing data from client side, pass to middleware
    var listing = req.body;
    console.log(listing);
    create.sendListing(listing);
});

module.exports = router; 

