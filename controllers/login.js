var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 
var user = require("../middlewares/users.js");

router.get('/',function(req,res,next){
    res.render('login');
});
router.post('/auth',function(req,res,next){
    var email = req.body.username;
    var password = req.body.password;
    // response obj not visible to auth so, pass callback
    // and send response to the client. 
    var setUserCookie = function (token){
        res.cookie('token',token,{expire : new Date() + 9999}).send({message:'cookie successfully set'});
    }
    auth.loginUser(email, password,setUserCookie); 
});

router.post('signup',function(req,res,next){
    var userInfo = {
        email: req.body.username, 
        password: req.body.password
    };
    var logIn = function(userInfo){
        auth.loginUser(userInfo.email,)
    }
    users.createUser(userInfo,logIn); 
});


module.exports = router; 