var admin = require("firebase-admin");
var firebase = require('firebase');
var express = require('express');
var router = express.Router(); 

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
function handleError(error){
  console.error(error.message); 
}
function handleLogin(username,password,cb){
  var currentUser;
  firebase.auth()
  .signInWithEmailAndPassword(username,password).
  then(function(userInfo){
    currentUser = firebase.auth().currentUser;
    cb(userInfo);
  })
  .catch(handleError);
  
  console.log(currentUser);
}

module.exports = {
    loginUser: function(username,password,cb){
      handleLogin(username,password,cb);  
          
    },
    verifyUser: function(token,cb){
      admin.auth().verifyIdToken(token).then(cb)
      .catch(handleError);
    },
    signOut: function(){
      firebase.auth().signOut();
    }
  }