var express = require('express');
var router = express.Router(); 
var db = require("../models/listings.js");

/* pass data to be stored to models, which stores into database */
function sendListing(listing){
    db.sendData(listing);
}

/* get all listings stored as an object */
function getListings(cb){
    //use this as cb to pass data back
    //access db through function in models folder
    db.getUserListings(cb);
}

/* Export functions for use in other parts of app */
module.exports = {
    sendListing: function(listing){
      sendListing(listing);      
    },
    getListings: function(cb){
        getListings(cb);
    }
}