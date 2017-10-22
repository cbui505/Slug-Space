(function() {
    //configurations for firebase	
    const config = {
            apiKey: "AIzaSyAs-ICWUpN1XGavOMCUfXeNzV7RD_OZiLk",
            authDomain: "slug-space.firebaseapp.com",
            databaseURL: "https://slug-space.firebaseio.com/",
            storageBucket: "gs://slug-space.appspot.com/"
        }
        //use above configurations
    firebase.initializeApp(config);

    //get elements from HTML
    const emailAdd = document.getElementById('email');
    const reset = document.getElementById('reset');

    //listen for press of sign of button
    reset.addEventListener('click', e => {
        //extract string values
        const emailText = emailAdd.value;
        const auth = firebase.auth();

        //reset user's password
        auth.sendPasswordResetEmail(emailText).then(function() {
                alert("Please check your email " + emailText + " for instructions.");
                console.log("email sent!")
            })
            .catch(function(err) {
                alert("ERROR! We weren't able to identify you given the information provided.");
                console.log("Email not sent!", err)
            });
    });
}())