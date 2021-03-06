var express = require('express');
var path = require('path');
var sys = require('sys');
var util = require('util');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var session = require ('express-session');
_ = require('underscore');
var Request = require('request');
var http = require('http');









var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


var routes = require('./routes/index');
var users = require('./routes/users');









// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use(cookieParser());
app.use(session({secret: 'sessionSecret', cookie: { maxAge: 100000 }, resave: true, saveUninitialized: true}));

// // uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));







//ROUTES
app.get("/", function(req, res){
    res.render('index.html');
});




//****************************************//




// Start the server

var port = process.env.PORT || 3000; 

server.listen(port);
console.log('Express started on port ' + port); 



var donatedSeconds = 10;



stateOfSwitch = true;

io.on('connection', function (socket) {
    socket.emit('news','handshake is done');
    // console.log("shake news sent");
    prevState1 = false;
    prevState2 = false;

    

  var countDown = setInterval(function() {

    

    if(donatedSeconds > 0){
      donatedSeconds--;
      io.sockets.emit('Switch', 'on');
    }

    else if(donatedSeconds <= 0 ){
      io.sockets.emit('Switch', 'off');

    }

    socket.emit('updateSeconds', donatedSeconds);

  },1000);

  
  socket.on('addMoreSeconds', function (data) {

    donatedSeconds += parseInt(data);
    console.log("adding More seconds: "+ data);
  });

  socket.on('message', function(data){
    console.log(data);
  })



});













