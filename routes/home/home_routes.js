var express = require('express');
var router = express.Router();
var login = require('./login');

router.get('/',function(req,res,next){
    res.render('index',{title:'Home Page', status:'connected'});
});

router.use('/login',login); 

module.exports = router; 