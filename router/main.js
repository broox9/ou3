module.exports = function (app) {
  /* doing render instead of "sendFile" since we are using EJS to render the templates */

	//routes go here
	app.get('/', function (req, res) {
  	res.render('index.html')
	})


  app.get('/about', function (req, res) {
    res.render('about.html')
  })
};