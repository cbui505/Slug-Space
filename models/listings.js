var firebase = require("firebase");

/*Store the listing's data in the database */
exports.sendData = function(listing){
  //debug
  console.log("made it to models");
  //get reference to database and where we want to push data
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  ref.push(listing);
};

/* return all listings currently in the database */
exports.getUserListings = function(cb){
  //get reference to database
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');

  var listingsArray = [];

  //get a snapshot of the listings in the db
  ref.once('value').then(function(snap) {
    var listings = snap.val();
    snap.forEach(function(element) {
        var elementVal = element.val();
        listingsArray.push(elementVal);
    });
    //pass listings along to cb function to avoid asynchronous bugs
    cb(listingsArray);
    
  });
}
