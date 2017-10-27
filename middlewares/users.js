var express = require('express');
var router = express.Router();
var admin = require('auth.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var alreadyExists = function(userInfo){
  if(!userInfo.email){
    throw new Error("This email is already in use");
  }
  
}

module.exports = router;
