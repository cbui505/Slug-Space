var firebase = require("firebase-admin");

firebase.initializeApp({
    credential: firebase.credential.cert({
    projectId: process.env.fire_project_id,
    clientEmail: process.env.fire_client_email,
    privateKey: process.env.fire_private_key
  }),
  databaseURL: "https://slug-space.firebaseio.com"
});

exports.getByEmail = function(email){
    firebase.auth().getUserByEmail(email)
    .then(function(user_record){
        return user_record.toJSON();
    })
    .catch(function(error){
        return error.message; 
    });
};

exports.getById = function(id){
    firebase.auth().getUser(uid)
    .then(function(user_record) {
      return user_record.toJSON();
    })
    .catch(function(error) {
      return error.message; 
    });
};

exports.createUser = function(user_info,cb){
    firebase.auth().createUser(user_info)
    .then(function(user_record){
        user_record.toJSON(); 
    })
    .catch(function(error){
        return error.message;
    })
};

exports.updateUser = function(user_id,updated_user_info){
    firebase.auth().updateUser(user_id, updated_user_info)
    .then(function(user_record){
        console.log(user_record.toJSON);
    })
    .catch(function(error){
        console.log(error); 
    });
};

exports.deleteUser = function(user_id){
    firebase.auth().deleteUser(user_id)
    .then(function(){
        console.log('deleted user');
    })
    .catch(function(error){
        console.log(error);
    });
};

exports.getAllUsers = function(page){
    firebase.auth().listUsers(page)
    .then(function(user_list){
        user_list.users.forEach(function(user){
            console.log(user.toJSON); 
        })
    })
    .catch(function(error){
        console.log(error); 
    });
}
