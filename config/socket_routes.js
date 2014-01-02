var sockets_controllers = require('../app/sockets_controllers');
module.exports = function(io){
    io.set('log level', 1);
	io.on('connection',function(socket){
		sockets_controllers.connection(socket,io);
	});
};