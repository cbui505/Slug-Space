var firebase = require("firebase");

/*firebase.initializeApp({
    credential: firebase.credential.cert({
    projectId: process.env.fire_project_id,
    clientEmail: process.env.fire_client_email,
    privateKey: process.env.fire_private_key
  }),
  databaseURL: "https://slug-space.firebaseio.com"
}); */


/*Store the listing's data in the database */
exports.sendData = function(listing){
  //debug
  console.log("made it to models");
  //get reference to database and where we want to push data
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  ref.push(listing);
};

//return all listings currently in the database
exports.getUserListings = function(){
  //get reference to database
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  var data = null;  //data is null and does not update in time
  ref.once('value').then(function(snap) {
    var listings = snap.val();
    //console.log(listings);   //would print listings since inside promise 
    data = listings;
  });
  return data;
  //BUG: data is never updated since functions are asyncronous
}

function getUserListingsHelper(data){
  console.log(data);
}