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