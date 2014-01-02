module.exports = function (io,User) {
	console.log('disconnect\n');
	io.sockets.emit('userCt',{userCt:--User.userCt});
};