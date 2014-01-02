module.exports = function (data,io,Questions) {
    	//console.log('answer:'+data);
    	//Questions.checkAnswer(data.answer,function(correct){
    		io.sockets.emit('answer',{userId:data.userId,answer:data.answer});
    		//if(correct){
	    		//Questions.getCurrentQuestion(function(question){
			    //	io.sockets.emit('question',question);
	    	/*	});
    		}				    	
    	});		*/       
    };