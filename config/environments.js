var path     = require('path');
var express  = require('express');

module.exports = function (app){
	// all environments
	console.log(__dirname);
	app.set('port', process.env.PORT || 80);
	app.set('views', path.join(__dirname, '../app/views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use('/public',express.static(path.join(__dirname, '../public')));
};