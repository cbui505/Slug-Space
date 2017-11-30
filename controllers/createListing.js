var express = require('express');
var create = require('../middlewares/sendListing.js');
var bodyParser = require('body-parser').json(); 
var router = express.Router();
var app = require('../app.js');

var user = app.get('currentUser');
var loginState = app.get('login');
router.get('/',function(req,res,next){
    
    loginState = app.get('login');
    if(!loginState){
        res.redirect("../login");
    }
    res.render('createListing',{'login':loginState});
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

/* Go to middleware and request for listings */
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

/* Go to middleware and request listings associated with current user (pass along) */
router.post('/getMyListings',function(req,res,next){
    //debug
    console.log("on route to getting listings of signed in user");
    var email = req.body.email;
    console.log("email is", email);
    //our callback function
    var allListings = function(data){
        console.log("Your listings: ", data);
    };
    //get the listing data from client side, pass to middleware
    create.getMyListings(allListings, email);
});

router.post('/showInterest',function(req,res,next){
    var user = app.get('currentUser');
    console.log("uid is ", user);
    //var uid = user.uid;
    /* user id isnt the number from the db?
       Need this to store interests, since email @ symbol cant be stored
       Otherwise: Switch @ with , and handle key processing in db function
    */
    //dummy data
    var uid = "chris";
    var listing = "125 bixby st";
    create.setInterest(uid, listing);
});

module.exports = router; 

