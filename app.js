var express = require('express')
var app = express()
var ejs = require('ejs')
var path = require('path')
var http = require('http')
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3002);
app.set('views',path.join(__dirname,'views'))
app.engine('html',ejs.__express)
app.set('view engine','html')
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'123456',
	cookie:{
		maxAge:24*60*1000
	},
	resave:false,
	saveUninitialized:true
}))

app.use(express.static(path.join(__dirname, 'public')));

var index = require('./index')
app.use('/', index);
// app.get('/',function(req,res){
// 	res.send('hello')
// })

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});