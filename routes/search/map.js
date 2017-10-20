var express = require('express');
var router = express.Router();

// allows for requests to made
var request = require('request');

const GOOGLE_API_KEY = "AIzaSyDFIklLWIVn9fal8b7hHmiMZln8tY4W8ig"; 


router.get('/viewmap',function(req,res,next){
    res.render('search');
});

module.exports = router; 