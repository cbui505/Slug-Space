var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js'); 
var app = require('../app');

var user = app.get('currentUser');
var loginState = app.get('login');
router.get('/',function(req,res,next){
    
    res.render('login',{'login':loginState});
});

router.post('/auth',function(req,res,next){
    var userInfo = req.body;
    // response obj not visible to auth so, pass callback
    // and send response to the client. 
    
    Object.keys(userInfo).length > 0? app.set('currentUser',userInfo) :
    app.set('currentUser',undefined);
    var state = app.get('currentUser')?true:false;
   
    app.set('login', state);
    if(state){
        res.send({"message":"success"});
    }else{
        res.send({"message":"failure"});
    }
    
});

router.post('/signup',function(req,res,next){
    var userInfo = {
        email: req.body.username, 
        password: req.body.password
    };
    
    auth.loginUser(userInfo.email, userInfo.password); 
    
});
router.post('/validateCookie',function(req,res,next){
    auth.verifyUser(req.body.token,function(userInfo){
        handleValidationResponse(res,userInfo);
    });
    //.catch(handleError);
});
router.post('/signout',function(req,res,next){
    app.set('currentUser',undefined);
    auth.signOut();
    res.redirect('/login');
    
});

function handleError(error){
    console.err(error);
}
function setCookie(res,token){
    res.cookie('token',token).send({message:'cookie successfully set'});
}
function setLogin(token){
    app.set('login',{'token':token,'valid':true});
}
function handleValidationResponse(res,userInfo){
    //console.log(userInfo);
    app.set('currentUser', userInfo);
    res.send({'status':'success'});

}
module.exports = router; 