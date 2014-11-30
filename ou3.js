var express = require('express')
var app = express()

var port = process.env.PORT || 3000

// require the router
require('./router/main')(app);

//set up the views dir and engines
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)



var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})