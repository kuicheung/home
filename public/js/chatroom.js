define(['lib/socketio'],function(io) { 
var Chatroom = 
{
  socket : io.connect('http://www.tinypandasoftware.com:4000'),
};
return Chatroom;
});

