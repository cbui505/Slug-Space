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
  getUserListings(cb);
}

/* function to do the above without being exported */
getUserListings = function(cb){
  //get reference to database
  console.log("gg?");
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
    console.log(listingsArray);
    cb(listingsArray);
    
  });
}

/* Get all listings that belong to a user */
exports.getMyListings = function(cb, user){
  //callback function to extract the listings of signed in user
  var getOnlyMine = function(allListings){
      //debug
      console.log("Trying to get your listings...");
      //initialize empty array to return list. Caller must handle empty lists
      var myListings = [];
      
      //iterate over listings and get listings belonging to user
      for(var i=0; i<allListings.length; i++){
            //skip entries in table with no email
          if(allListings[i].email == null) continue;
          if(allListings[i].email != user) continue;
          myListings.push(allListings[i]);
      }      
      cb(myListings);
  }
  //get all listings first
  getUserListings(getOnlyMine);
}

/* filters the listings based on specified filters */
exports.filterListings = function(filters, cb){
   //filters: object that contains a max_rent, max_tenants, min_bed
   //cb: callback function that will execute result of this. (needed for asyncronous) see ex above
}