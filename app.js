var express = require('express');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


var app = express();
var env = 'development';


// view engine setup
app.set('views', path.join(__dirname, '/app'));
app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//static routes for front end files
app.use('/', express.static("app"));
app.use('/images', express.static("/images"));

app.get('/', function(req, res){
    res.render('index.html');
});

module.exports = app;