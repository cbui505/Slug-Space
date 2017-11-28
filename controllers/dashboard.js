var express = require('express');
var router = express.Router();
var listings = require('../models/listings.js');
var app = require('../app.js');

var user = app.get('currentUser');
var loginState = app.get('login');
router.get('/', function (req, res, next) {
    var loginState = app.get('login');
    if(!loginState){
        res.redirect("../login");
    }
    res.render('dashboard',{'login':loginState});
});

router.get('/allListings', function (req, res, next) {
    var sendListings = function (allListings) {
        if (allListings) {
            res.send(allListings);
        } else {
            console.error("listings is undefined");
        }
    }
    var email = req.body.email;
    console.log('this get doesnt suck');
    listings.getMyListings(sendListings, email);
});

module.exports = router;
