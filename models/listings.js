
var firebase = require("firebase");

/*Store the listing's data in the database */
exports.sendData = function(listing){
  //debug
  console.log("made it to models");

  //get reference to database and where we want to push data
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  //add the listing to the db
  ref.push(listing);
};

/* return all listings currently in the database */
exports.getUserListings = function(cb){
  //get reference to database
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  
  //we will return all of the listings in an array
  var listingsArray = [];

  //get a snapshot of the listings in the db
  ref.once('value').then(function(snap) {
    //iterate over each listing, and add it to the array
    snap.forEach(function(element) {
        var elementVal = element.val();
        listingsArray.push(elementVal);
    });
    //pass listings along to cb function to avoid asynchronous bugs
    cb(listingsArray);
    
  });
}

/* filters the listings based on specified filters */
exports.filterListings = function(filters,value, cb){
   //filters: object that contains a max_rent, max_tenants, min_bed
   //get reference to database
  var slugDB = firebase.database();
  //child = attribute (ex: rent, beds, tenants), need to add value argument in function so users can specify how many (bedrooms, tenants, etc.)
  var ref = slugDB.rootRef.child('Listings').orderByChild("'" + filters + "'").startAt().endAt().on("'" + value + "'", function(snapshot);

  var listingsArray = [];

  console.log(snapshot.val());
  snapshot.forEach(function(data) {
      //console.log(data.key);
      listingsArray.push(data.key);
  });

  cb(listingsArray);

   //cb: callback function that will execute result of this. (needed for asyncronous) see ex above
}












