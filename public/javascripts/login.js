var user = (function(){
    var url;
    var currentUser;
    
    function init(){
        bindLoginButton(); 
        //observeUserLoginState();    
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
            .catch(handleError);
        }
    }
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
    function validateCookie(data){
        var url = url = window.location.origin + '/login/validateCookie'; 
        return $.ajax({
            url:url,
            method:'POST',
            data:data,
            dataType:'json'
        });
    }
    function handleCookieResponse(data){
        if(data.status === 'success') {
            window.location.href='/search';
        } else{
            showErrorMessage();
        }
    }
    function showErrorMessage(){
        console.log('create error on sign in form');
    }
    function observeUserLoginState(){
        var currentUser;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentUser = user;
                postUserInfo(user);
            }else{
                redirectToHomePage();
            }
        });
    }
    function createNewUser(){

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
            firebase.auth().signOut();
            redirectToHomePage();
        });
    }
    function redirectToHomePage(){
        window.location = window.location.origin + '/login';
    }
    function redirectToSearchPage(){
        window.location = window.location.origin + '/search';
    }
    return {
        get url() {return url},
        set url(v) {url = v},
        
        init: init,
        init_user_page: init_user_page,
    }
}());