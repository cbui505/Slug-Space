var express = require('express');
var router = express.Router(); 
var db = require("../models/listings.js");

/* pass data to be stored to models, which stores into database */
function sendListing(listing){
    //db.sendData(listing);
    var a = db.getUserListings();
        
}

module.exports = {
    sendListing: function(listing){
      sendListing(listing);      
    }
}