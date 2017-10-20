var express = require('express');
var router = express.Router();

var maps = require('./map');
var search = require('./search');
var request = require('request');

router.get('/',function(req,res,next){
    res.render('search');
});

router.use('/getMap', maps);
router.use('/search', search);  

module.exports = router; 