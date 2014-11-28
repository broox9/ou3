module.exports = function (app) {
	//routes go here
	app.get('/', function (req, res) {
  	res.render('index.html')
	})
};