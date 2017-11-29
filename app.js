var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var hbs = require('hbs');
var app = module.exports = express();
var controllers = require('./controllers/index.js');

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('currentUser',undefined);
app.set('login',false); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/views/partials/:name',function(req,res,next){
  var path = __dirname + req.path;
  console.log(path);
  res.sendFile(__dirname + '/views/partials/' + req.params.name); 
})
app.get('/views/:name',function(req,res,next){
  var path = __dirname + req.path;
  console.log(path);
  res.sendFile(__dirname + '/views/clientSideTemplate/' + req.params.name); 
})
//* this tells the app that we are using the routes dir for all of our controllers
app.use('/', controllers);


//* ERROR HANDLING
//* catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

