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
  var parsed_uid = uid.replace(".", ",");

  //firebase doesnt let us store email as key, use uid instead
  ref.child(parsed_uid).once('value')
      //if uid exists, append to the string of interests
      .then(function(snapshot){
          var interest = snapshot.val();
          interest += ",,," + listing;
          console.log("new interest is ", interest);
          ref.child(parsed_uid).set(interest);
      })
      //otherwise create the uid in db and set the first interest
      .catch(function(){
          ref.child(parsed_uid).set(listing);
      });
}

/* get the user's interested listings and return it as an array */
//Note that uid referes to email of current user
exports.getInterests = function(uid, cb){
  getInterests(uid, cb);
}

getInterests = function(uid, cb){
  var slugDB = firebase.database();
  var ref = slugDB.ref('Users');
  var interests = [];
  
  //firebase doesnt allow storing email as key due to '.' so replace '.' with ','
  var parsed_uid = uid.replace(".", ",")

  ref.child(parsed_uid).once('value')
      //try to get the user's interests if any
      .then(function(snapshot){
        var interest_string = snapshot.val();
        interests = interest_string.split(",,,");
        cb(interests);
      })
      //if there are none, return null
      .catch(function(error){
        console.log("User "+uid+ " is not in db... ERROR: "+error);
        cb(null);
      })
}

/* remove the specified listing from given user's interested listings in db */
exports.removeInterest = function(uid, listing){
  var slugDB = firebase.database();
  var ref = slugDB.ref('Users');
  var parsed_uid = uid.replace(".", ",");

  //callback function to run after getting user's interested listings
  var deleteInterest = function(interests){
      //iterate through interests and delete if we find it
      for(var i=0; i<interests.length; i++){
        if(interests[i] == listing){
          console.log("deleted interest: ", interests[i]);
          interests.splice(i, 1);
          break;
        }
      }
      
      //update user's interests in database
      var updatedInterests = interests.join(",,,");
      console.log("Interests for " + parsed_uid + " are now ", updatedInterests);
      ref.child(parsed_uid).set(updatedInterests);
  };

  //fetch all user interests and then run the above callback
  getInterests(uid, deleteInterest);
}