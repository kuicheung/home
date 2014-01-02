
/**
 * Module dependencies.
 */

var express = require('express'),
	app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
var http = require('http');
var environment = require('./config/environments');
var routes = require('./config/routes');
var socket_routes = require('./config/socket_routes');

environment(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
socket_routes(io);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
