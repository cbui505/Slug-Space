(function() {

    console.log("made it here");
    const config = {
        apiKey: "AIzaSyAs-ICWUpN1XGavOMCUfXeNzV7RD_OZiLk",
        authDomain: "slug-space.firebaseapp.com",
        databaseURL: "https://slug-space.firebaseio.com/",
        storageBucket: "gs://slug-space.appspot.com/"
    }

    firebase.initializeApp(config);

    const emailText = document.getElementById('email');
    const passwordText = document.getElementById('password');
    const signUp = document.getElementById('signUp');
    const login = document.getElementById('login');


    if (signUp != null) {
        signUp.addEventListener('click', e => {
            const email = emailText.value;
            const pass = passwordText.value;
            const auth = firebase.auth();
            var user = firebase.auth().currentUser;

            auth.createUserWithEmailAndPassword(email, pass)
                .then(function(user) {
                    if (user && user.emailVerified == false) {
                        user.sendEmailVerification().
                        then(function() {
                            alert("User " + email + " created Successfully. Please verify your email");
                            console.log("Successfully created new user. Email verification sent to " + email);
                        })
                    }
                }).catch(function(error) {
                    alert("Unable to create user with email: " + email);
                    console.log("Error creating new user:", error);
                })


        });
    }

    if (login != null) {
        //wait for press of login button
        login.addEventListener('click', e => {
            //extract string values
            const email = emailText.value;
            const pass = passwordText.value;
            //use auth for user validation
            const auth = firebase.auth();

            //try to log in with inputted credentials

            auth.signInWithEmailAndPassword(email, pass)
                //show message if it works
                .then(function(userRecord) {
                    alert("ayy managed to login");
                    console.log("Successfully logged into user:", userRecord.uid);

                })
                //otherwise error message
                .catch(function(error) {
                    console.log("Error logging into account " + email + " with error: ", error);
                });
        });
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log("Not logged in yet");
        }
    });
}())