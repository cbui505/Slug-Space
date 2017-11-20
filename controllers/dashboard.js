var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 

router.get('/',function(req,res,next){
    res.render('dashboard');
});

module.exports = router;
