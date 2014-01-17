define(['text!/templates/chatbox.html','chatroom'],
        function(chatbox,chatroom){
	var ChatboxView = Backbone.View.extend({
    tagName: 'div',
    chatbox: _.template(chatbox),
    initialize: function(){
    	this.listenTo(this.model, 'change', this.render);
    	this.loadSockets();
        var that = this;
        setTimeout(function(){
            console.log('timeout');
            if(that.model.get('userid')<=1000)
                console.log('no id');
            chatroom.socket.send('newUser');
        },2000);
    },
    loadSockets: function(){
    	var that = this;
        chatroom.socket.on('answer', function (data) {

            console.log(data);
      	  	var modelText = that.model.get('text')?that.model.get('text'):'';
      	  	that.model.set('text',
      	  				modelText+data.userId+':'+data.answer+'\n');
            var textbox = $('#answer-textbox');
      	  	textbox.scrollTop(textbox[0].scrollHeight - textbox.height());
            console.log(textbox[0].scrollHeight);
        });
        chatroom.socket.on('userId', function (data) {
            console.log('socket on userid');
            that.model.set('userId',data.userId);
            console.log(data);
        });
        chatroom.socket.on('userCt', function (data) {
            that.model.set('userCt',data.userCt);       
        });
    },
    events: {
    	'click button' : 'sendMsg',
    	'submit form' : 'sendMsg'
    },
    render: function() {
        var that = this;
    	this.$el.html(this.chatbox(this.model.toJSON()));
    	// $('#answer').focus();

    	return this;
    },
    sendMsg: function(e){
        e.preventDefault();
    	 var answer = $("#answer").val();
		  if(answer){
			  chatroom.socket.emit("answer",
					  {userId:this.model.get('userId'),answer:answer});
			  $("#answer").val('');
		  }
    }
  });
  return ChatboxView;
 });
