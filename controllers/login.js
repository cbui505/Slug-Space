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
    
    auth.loginUser(userInfo.email, userInfo.password,next); 
    
});
router.post('signup',function(req,res,next){
    var userInfo = {
        email: req.body.username, 
        password: req.body.password
    };
    
    auth.loginUser(userInfo.email, userInfo.password); 
    
});


module.exports = router; 