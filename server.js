var express = require('express')
var app = express()
//var bodyParser = require('bodyParser')
//var cookieParser = require('cookieParser')
//var session = require('session')

var port = process.env.PORT || 3000
var wu ='680c6f1ba7a156e7'
// require the router
require('./router/main')(app);

////body parser plugin for POST requests
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//
////cookie parser plugin for cookies *duh*
//app.use(cookieParser());
//
////session plugin for sessions *re-duh*
//app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', key: 'sid'}));


//where to the static files live tho?
// app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

//set up the views dir and engines
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)



var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Ou-3 listening at http://%s:%s', host, port)

});
