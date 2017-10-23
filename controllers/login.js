var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 

router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/auth',function(req,res,next){
    console.log('hello world');
    console.log(req.body); 
    auth.loginUser(req.body.username, req.body.password);
    console.log('success');
});

module.exports = router; 