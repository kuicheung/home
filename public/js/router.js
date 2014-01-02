define(function(){
var Router = Backbone.Router.extend({
    		  routes: {
    		    ":id": "page"
    		  },
    		  initialize: function(pageView){
    			  this.pageView = pageView;
    		  },
    		  page: function(name) {
    			  this.pageView.renderPage(name);
    		  }
});
return Router;
});