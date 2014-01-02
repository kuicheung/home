var socket_controllers = require('./socket_controllers');
var models = require('../models');
module.exports = function (socket,io) {


    socket.emit('userId', { userId: models.User.userId++ });
    
    /*models.Questions.getCurrentQuestion(function(question){	
    	socket.emit('question',question);
    });*/

   // console.log('userid'+models.User.userId);
    io.sockets.emit('userCt',{userCt:++models.User.userCt});
    
    socket.on('answer', function(data){
    	socket_controllers.answer(data,io,models.Questions);
    });

    socket.on('message',function(msg){
        if(msg==='newUser'){
            socket.emit('userId', { userId: models.User.userId++ });
            io.sockets.emit('userCt',{userCt:models.User.userCt});
           // console.log('abc');
        }
    });
    
    socket.on('disconnect', function(){
    	socket_controllers.disconnect(io,models.User);
    });
};