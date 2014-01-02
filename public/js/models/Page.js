define(function(){
var Page = Backbone.Model.extend({
	defaults: function(){
		title = 'title';
		body = 'body';
	}
});
return Page;
});