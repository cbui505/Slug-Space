const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(
	functions.config().firebase
	);

var path = require('path');

var app = express();

var public = __dirname + "/../public/";

app.engine('hbs', engines.handlebars);
//app.set('views', './views');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	response.sendFile("index.html");
});

app.get('/login/', (request, response) => {
	response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	response.sendFile("login.html");
});

app.get('/signup/', (request, response) => {
	response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	response.sendFile("signup.html");
});

exports.app = functions.https.onRequest(app);
