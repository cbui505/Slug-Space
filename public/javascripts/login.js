var user = (function(){
    var url;

    function init(){
        if($.cookie('token')){
            window.location.href="/search";
        }
        bindLoginButton(); 
    }

    function bindLoginButton(){
        var params;
        $('#login').on('click',function(e){
            e.preventDefault(); 
            var $username = $('#username');
            var $password = $('#password');
            if(!$username.val() || !$password.val()){
                console.log('failure');
                // write to the screen that an error has occured
            }else{
                params = {};
                params.username = $username.val();
                params.password = $password.val(); 
            }
            
            if(params && !$.cookie('token')){
                postLoginInfo(params).then(function(res){
                    console.log(res.message);
                });
            } else {
                window.location.href = '/search';
            }
        });
    }
    function postLoginInfo(data){
        url = window.location.origin + '/login/auth'; 
        console.log(url);
        return $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json'
        });
    }
    return {
        get url() {return url},
        set url(v) {url = v},

        init: init
    }
}());