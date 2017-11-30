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
  console.log('hi');
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

/* adds listing to user's list of interested listings in db */
exports.setInterest = function(uid, listing){
/* FireBase doesn't let us use arrays in the database. Instead,
   we will store the listings as a single string. We can use String
   manipulation to extract an array of interested listings. We need access 
   to all of a user's interested listings, so we will make another
   db table for this.
*/

  var slugDB = firebase.database();
  var ref = slugDB.ref('Users');

  //firebase doesnt let us store email as key, use uid instead
  ref.child(uid).once('value')
      //if uid exists, append to the string of interests
      .then(function(snapshot){
          var interest = snapshot.val();
          interest += ", " + listing;
          console.log("new interest is ", interest);
          ref.child(uid).set(interest);
      })
      //otherwise create the uid in db and set the first interest
      .catch(function(){
          ref.child(uid).set(listing);
      });
}