define(['text!/templates/page.html','views/GameView','nivoSlider'],
        function(pageTemp,GameView,nivoSlider){
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
    initUnityPlayer: function(){
    	console.log('init player');
    	var that = this;
    	var config = {
				width: 800, 
				height: 450,
				params: { enableDebugging:"0" }
				
			};
    		
    			this.unityPlayer = new UnityObject2(config);

				jQuery(function() {
	
					var $missingScreen = jQuery("#unityPlayer").find(".missing");
					var $brokenScreen = jQuery("#unityPlayer").find(".broken");
					$missingScreen.hide();
					$brokenScreen.hide();
					console.log('after hide');
					that.unityPlayer.observeProgress(function (progress) {
						switch(progress.pluginStatus) {
							case "broken":
								$brokenScreen.find("a").click(function (e) {
									e.stopPropagation();
									e.preventDefault();
									that.unityPlayer.installPlugin();
									return false;
								});
								$brokenScreen.show();
							break;
							case "missing":
								$missingScreen.find("a").click(function (e) {
									e.stopPropagation();
									e.preventDefault();
									that.unityPlayer.installPlugin();
									return false;
								});
								$missingScreen.show();
							break;
							case "installed":
								$missingScreen.remove();
							break;
							case "first":
							break;
						}
					});
					that.unityPlayer.initPlugin(jQuery("#unityPlayer")[0], "/web player.unity3d");
				});
    		
    },
    renderPage: function(name){
    	if(this.currentView){
    		if(this.currentName=='shooter'){
    			$('#unity-view').css({position:'absolute',left:-1000,top:-1000});
    		}
    		else
    			this.currentView.hide();    		
    	}
    	this.currentName = name;
    	
    	if(!this.views[name]){
    		this.views[name] = $('<div></div>').html(this.pageTemplate(this.pages.get(name).toJSON()));
    		console.log('new view '+name);
    		this.$el.append(this.views[name]);
	    	if(name==='home'){
	    		this.$el.find('#game-div').html($('<div class="frame"></div>').html(this.game));
	    	}
	    	else if(name==='bart-tracker'){
	    		this.$el.find('#slider').nivoSlider({pauseTime: 1000000});
			}
	    	else if(name==='siquoia'){
	    		this.$el.find('#slider2').nivoSlider({pauseTime: 1000000});
			}
    	}
    	this.currentView = this.views[name];
    	if(name=='shooter'){
    		console.log(this.unityPlayer == undefined);
        	if(!this.unityPlayer){
        		this.initUnityPlayer();
        	}
    		$('#unity-view').css({position:'fixed',left:100,top:100});
    		
    	}
    	
    	this.currentView.show();
    }
  });
  return PageView;
 });
