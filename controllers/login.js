var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 


router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/auth',function(req,res,next){
    var userInfo = {
        email: req.body.username, 
        password: req.body.password
    };
    // response obj not visible to auth so, pass callback
    // and send response to the client. 
    var cb = function (token){
        res.send({token:token}); 
    }
    auth.loginUser(userInfo.email, userInfo.password,cb); 
});

router.post('signup',function(req,res,next){
    var userInfo = {
        email: req.body.username, 
        password: req.body.password
    };
    
    auth.loginUser(userInfo.email, userInfo.password); 
    
});


module.exports = router; 