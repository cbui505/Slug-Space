var firebase = require("firebase");
var ListingsData = require('./createListing.js')

firebase.initializeApp({
    credential: firebase.credential.cert({
    projectId: process.env.fire_project_id,
    clientEmail: process.env.fire_client_email,
    privateKey: process.env.fire_private_key
  }),
  databaseURL: "https://slug-space.firebaseio.com"
});



exports.sendData = function(address, rent, deposit, fee, description){
    //cannot find vars for listings!!
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  var data = {
    Address: add,
    Rent:rent,
    Deposit: deposit,
    Fee: fee
    Description: description
  }
  ref.push(data);
};