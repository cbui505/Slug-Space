var firebase = require('firebase');

const config = {
  apiKey: "AIzaSyAs-ICWUpN1XGavOMCUfXeNzV7RD_OZiLk",
  authDomain: "slug-space.firebaseapp.com",
  databaseURL: "https://slug-space.firebaseio.com/",
  storageBucket: "gs://slug-space.appspot.com/"
}

firebase.initializeApp(config); 

module.exports = {
    isAuthenticated: function (req, res, next) {
      var user = firebase.auth().currentUser;
      if (user !== null) {
        req.user = user;
        next();
      } else {
        res.redirect('/login');
      }
    },
    loginUser: function(username,password){
      firebase.auth().signInWithEmailAndPassword(username,password)
      .catch(function(error){
        console.log('failure');
      });
    }
  }