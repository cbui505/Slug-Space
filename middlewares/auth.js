var admin = require("firebase-admin");
var firebase = require('firebase');


admin.initializeApp({
    credential: admin.credential.cert({
    projectId: process.env.fire_project_id,
    clientEmail: process.env.fire_client_email,
    privateKey: process.env.fire_private_key
  }),
  databaseURL: "https://slug-space.firebaseio.com"
});
var config = {
  apiKey: "AIzaSyAs-ICWUpN1XGavOMCUfXeNzV7RD_OZiLk",
  authDomain: "slug-space.firebaseapp.com",
  databaseURL: "https://slug-space.firebaseio.com",
  projectId: "slug-space",
  storageBucket: "slug-space.appspot.com",
  messagingSenderId: "367997600602"
};
firebase.initializeApp(config);

module.exports = {
    loginUser: function(username,password,cb){
      firebase.auth().signInWithEmailAndPassword(username,password)
      .then(function(userInfo){
        admin.auth().createCustomToken(userInfo.uid)
        .then(function(token){
          return new Promise(function(resolve,reject))
        })
        .catch(function(error){
          console.log(error); 
          return undefined; 
        })
      })
      .catch(function(err){
        console.log(err.message); 
      });
    }
  }