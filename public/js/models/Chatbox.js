define(function(){
var Chatbox = Backbone.Model.extend({
	defaults: function(){
		userCt = 0;
		userId = 1000;
		text = "";
	}
});
return Chatbox;
});