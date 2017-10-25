var firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.fire_project_id,
    clientEmail: process.env.fire_client_email,
    privateKey: process.env.fire_private_key
  }),
  databaseURL: "https://slug-space.firebaseio.com"
});

module.exports = {
    createUser: function(userInfo){
      var params = {};
      params.email = userInfo.email? userInfo.email : undefined;
      params.email_verified = false,
      params.password = userInfo.password? userInfo.password : undefined; 
      params.imgURL = userInfo.imgURL?userInfo.imgURL : undefined; 

      firebase.auth().createUser(params)
      .then(function(userRecord){
        console.log(userRecord); 
      })
      .catch(function(error){
        console.log('extreme failure'); 
      }); 
    },
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
      firebase.auth().getUserByEmail(username)
      .then(function(userRecord){
        console.log(userRecord.toJSON); 
      })
      .catch(function(error){
        console.log('failure');
      });
    }
  }