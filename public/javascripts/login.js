var user = (function(){
    var url;
    var currentUser;
    
    function init(){
        bindLoginButton();     
        bindSignUp();
    }
    function init_user_page(){
        observeUserLoginState();
        bindSignOut();
    }
    function signIn() {
        var $username = $('#username');
        var $password = $('#password');
       
        if(!$username.val() || !$password.val()){
            console.log('failure');
            // write to the screen that an error has occured
            $("#signUp").parent().find("span").text("passwords do not match");
        } else {
            var currentUser;
            firebase.auth().signInWithEmailAndPassword($username.val(),$password.val())
            .then(function(userInfo){
                currentUser = userInfo; 
                console.log('currentUser set');
                postUserInfo(userInfo).then(function(res){
                    if(res === "success"){
                        window.location = window.location.origin + '/search';
                    }
                });
            })
            .catch(writeErrorToForm);
        }
    }
    
    //google doesn't play nice with jquery sometimes
    //had to do this the old fashioned way
    //without $.ajax
    function postUserInfo(userInfo){
        url = window.location.origin + '/login/auth'; 
        var def = $.Deferred();
        var user = JSON.stringify(userInfo);
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST',url);
        //Send the proper header information along with the request
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(userInfo)); 
        xhttp.onreadystatechange = function(res) {//Call a function when the state changes.
            if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
                // Request finished. Do processing here.
                def.resolve(JSON.parse(xhttp.responseText).message);
            }
        }
        return def;
    }
    function handleError(error){
        
        console.error(error);
    }
    function writeErrorToForm(error){
        var INVALID_EMAIL = 0,
            INVALID_PASSWORD = 1,
            EMAIL_IN_USE = 2,
            WEAK_PASSWORD = 3;
        switch(mapToErrorCodes(error.code)){
            case INVALID_EMAIL: 
                $("#username").parent().find("span").text(error.message);
                break;
            case INVALID_PASSWORD:
                $("#password").parent().find("span").text(error.message);
                break;
            case EMAIL_IN_USE:
                $("#username").parent().find("span").text(error.message);
                break;
            case WEAK_PASSWORD:
                $("#password").parent().find("span").text(error.message);
                break;
        }
        console.error(error);
    }
    function observeUserLoginState(){
        var currentUser;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //if user is signed in and they visit home page, direct to search
                if(window.location == window.location.origin + "/"){
                    window.location=window.location.origin + "/search";
                }
                //otherwise manage accordingly
                currentUser = user;
                postUserInfo(user);
            }else{
                //if user isnt signed in, but theyre on home page, just show a blank map
                if(window.location != window.location.origin + "/"){
                    redirectToHomePage();
                }
            }
        });
    }
    function bindLoginButton(){
        $('#login').on('click',function(e){
            e.preventDefault(); 
            signIn();
        });
    }
    function bindSignOut(){
        $("#signOut").on('click',function(e){
            e.preventDefault();
            postUserInfo().then(function(res){
                console.log(res.message);
                firebase.auth().signOut();
                redirectToHomePage();
            }); 
            //redirectToHomePage();
        });
    }
    function bindSignUp(){
        $("#signUp").on('click',function(e){
            e.preventDefault();
            signUp();
        });
    }
    function signUp(){
        var $username = $('#username');
        var $password = $('#password');
        var $password2 = $("#re-password"); 
        if($password.val() !== $password2.val()){
            console.error("passwords do not match");
            return;
        }
        var currentUser;
        firebase.auth().createUserWithEmailAndPassword($username.val(),$password.val())
        .then(function(userInfo){
            currentUser = userInfo; 
            console.log('currentUser set');
            postUserInfo(userInfo).then(function(res){
                if(res === "success"){
                    window.location = window.location.origin + '/search';
                }
            });
        })
        .catch(writeErrorToForm);
        
    }
    function redirectToHomePage(){
        window.location = window.location.origin + '/login';
    }
    function mapToErrorCodes(code){
        errorMap = {
            'auth/invalid-email': 0,
            "auth/wrong-password" : 1,
            'auth/email-already-in-use': 2,
            'auth/weak-password':3,
        };
        return errorMap[code];
    }
    return {
        get url() {return url},
        set url(v) {url = v},
        
        init: init,
        init_user_page: init_user_page,
    }
}());