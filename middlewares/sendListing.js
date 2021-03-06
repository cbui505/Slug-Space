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

function getMyListings(cb, email){
    db.getMyListings(cb, email);
}

function setInterest(uid, listing){
    db.setInterest(uid, listing);
}

function getInterest(uid, cb){
    db.getInterests(uid, cb);
}

function removeInterest(uid, listing){
    db.removeInterest(uid, listing);
}

/* Export functions for use in other parts of app */
module.exports = {
    sendListing: function(listing){
      sendListing(listing);      
    },
    getListings: function(cb){
        getListings(cb);
    },
    getMyListings: function(cb, email){
        getMyListings(cb, email);
    },
    setInterest: function(uid, listing){
        setInterest(uid, listing);
    },
    getInterest: function(uid, cb){
        getInterest(uid, cb);
    },
    removeInterest: function(uid, listing){
        removeInterest(uid, listing);
    }
}