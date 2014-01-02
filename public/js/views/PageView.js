define(['text!/public/templates/page.html','views/GameView'],
        function(pageTemp,GameView){
	var PageView = Backbone.View.extend({
    tagName: 'div',
    pageTemplate: _.template(pageTemp),
    initialize: function(params){
    	this.pages = params.pages;
    	var gameView = new GameView();
        gameView.render();
        this.game = gameView.$el;
        this.views = {};
    },
    events: {
    },
    renderPage: function(name){
    	if(this.currentView)
    		this.currentView.hide();
    	
    	if(!this.views[name]){
    		this.views[name] = $('<div></div>').html(this.pageTemplate(this.pages.get(name).toJSON()));
    		this.$el.append(this.views[name]);
	    	if(name==='home'){
	    		this.$el.find('#home').append($('<div id="frame"></div>').html(this.game));
	    	}
    	}
    	this.currentView = this.views[name].show();
    }
  });
  return PageView;
 });
