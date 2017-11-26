
var firebase = require("firebase");

/*Store the listing's data in the database */
exports.sendData = function(listing){
  //debug
  console.log("made it to models");
  var user = firebase.auth().currentUser;
  if(!user){
    console.log("database push: no one signed in?");
    return;
  }
  listing.email = user.email;
  //get reference to database and where we want to push data
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  //add the listing to the db
  ref.push(listing);
};

/* return all listings currently in the database */
exports.getUserListings = function(cb){
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
    cb(listingsArray);
    
  });
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
    cb(listingsArray);
    
  });
}

/* Get all listings that belong to a user */
//BUG: will not work if user is not signed in. Need a way to check this without using cookie?
exports.getMyListings = function(cb){
  //callback function to extract the listings of signed in user
  var getOnlyMine = function(allListings){
      //debug
      console.log("Trying to get your listings...");
      //initialize empty array to return list. Caller must handle empty lists
      var myListings = [];
      var user = firebase.auth().currentUser;
      //make sure user is signed in
      if(!user){
        console.log("user not signed in?");
        return null;
      }
      //iterate over listings and get listings belonging to user
      for(var i=0; i<allListings.length; i++){
          //skip entries in table with no email
          if(allListings[i].email == null) continue;
          if(allListings[i].email != user.email) continue;
          myListings.push(allListings[i]);
      }
      cb(myListings);
  }
  
  getUserListings(getOnlyMine);


}

/* filters the listings based on specified filters */
exports.filterListings = function(filters,cb){

  var getFiltered = function(allListings){
      //debug
      //console.log("Retrieving Filtered Listing..");
      //initialize empty array to return list. Caller must handle empty lists
      var myListings = [];
      
      //iterate over listings and get listings belonging to user
      for(var i=0; i<allListings.length; i++){
          //skip entries in table with no email
          if(allListings[i].address != filters) continue;
          if(allListings[i].deposit != filters) continue;
          if(allListings[i].fee != filters) continue;
          if(allListings[i].rent != filters) continue;
          //if(allListings[i].tenants != filters) continue; //no tenant field in database yet.

          myListings.push(allListings[i]);
      }
      cb(myListings);
  }
  
  getUserListings(getFiltered);
   //cb: callback function that will execute result of this. (needed for asyncronous) see ex above
}












