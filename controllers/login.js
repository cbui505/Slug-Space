var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 

router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/auth',function(req,res,next){
    console.log('hello world');
    console.log(req.body); 
    var userInfo = {
        email: req.body.username, 
        password: req.body.password
    };
    auth.createUser(userInfo);
    console.log('success');
});


module.exports = router; 