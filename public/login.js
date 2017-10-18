(function(){

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

	signUp.addEventListener('click', e => {
		const email = emailText.value;
		const pass = passwordText.value;
		const auth = firebase.auth();

		firebase.createUserWithEmailAndPassword(email, pass)
  		.then(function(userRecord) {
    		// A UserRecord representation of the newly created user is returned
    		console.log("Successfully created new user:", userRecord.uid);
 		 })
  		.catch(function(error) {
   			 console.log("Error creating new user:", error);
 		 });
		promise.catch(e=> alert("account not made"));
	});

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
		}else{
			console.log("Not logged in yet");
		}
	});
})