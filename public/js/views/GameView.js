/**
 * Created by Kiwi on 12/26/13.
 */
define(['text!/templates/game.html','models/Player','text!/img/game/park2.json','grid','ga','views/EntityView'],
    function(gameTemplate,Player,tilesJson,mapgrid,ga,EntityView){
        var GameView = Backbone.View.extend({
            tagName: 'div',
            currentPt: [0,0],
            gameTemp: _.template(gameTemplate),
            initialize: function(){
                this.mapgrid = new mapgrid(30,50,16,tilesJson);
                this.ga = new ga(this.mapgrid);
            },
            events: {
                'click #aplayer' : 'playSound',
                'click #but-start' : 'startGame',
                'click #but-stop' : 'stopGame',
                'click #but-reset' : 'resetGame',
                'mouseover #game' : 'mouseoverGame',
                'mouseleave #game' : 'mouseleaveGame'
            },                  
            
            /*
             *  Generate new pellets for the board
             */
            generatePellets: function(cord){
                var i,tile,row,col,pelletImg,pelletsPath=[];
                var pellets = [];
                for(i=0;i<10;i++){
                    do{
                        tile = Math.round(Math.random()*(this.mapgrid.tilesAry.length-1));
                    }
                    while(this.mapgrid.tilesAry[tile]>0);
                    col = tile%50;
                    row = Math.floor(tile/50);
                    pellets[i]={row:row,col:col};
                }

                if(cord)
                    pelletsPath.push({i:1,row:cord.row,col:cord.col});
                for(i=0;i<pellets.length;i++){
                    index = i+'';
                    y = Math.floor(pellets[i].row*this.mapgrid.gridsize);
                    x = Math.floor(pellets[i].col*this.mapgrid.gridsize);

                    pelletImg = $('<img class="pellet" src="/img/game/bass.png"/>')
                        .css({top:y,left:x});
                    this.game.append(pelletImg);
                    pelletsPath.push({i:i+2,row:pellets[i].row,col:pellets[i].col,pelletImg:pelletImg});
                }
                
                return pelletsPath;
            },
            
            /*
             *  Game board clicked
             *  param: clicked event
             */
            contentClicked: function(e){
                var gridsize = this.gridsize;
                var col =  Math.floor((e.clientX-this.game.offset().left)/gridsize);
                var row = Math.floor((e.clientY+$(document).scrollTop()-this.game.offset().top)/gridsize);

                this.moveTo(col,row);
            },
            
            /*
             *  Show game buttons when mouse over game
             */
            mouseoverGame: function(){
            	console.log('mouseover');
            },
            
            /*
             *  Show game buttons when mouse over game
             */
            mouseleaveGame: function(){
            	console.log('mouseleave');
            },
            
            /*
             *  Reset current game board 
             */
            resetGame: function(){
            	this.stopGame();
            	$('.pellet').remove();
            	this.newGame = true;
            },
            
            /*
             * Start or resume game
             */
            startGame: function(){
            	var that = this;
            	
            	var reachPellet = function(p){
                    if(p&&p.pelletImg){
                        p.pelletImg.remove();
                        that.points = _.without(that.points,p);
                    }
                    if(that.points.length<1||(that.points.length==1&&that.points[0].i==1)){
                        that.newGame = true;
                        that.startGame();
                    }
                };     
            	if(this.newGame){
            		this.newGame = false;
            		this.points = this.generatePellets(this.entity?this.entity.currentPos:{col:0,row:0});
            		this.entity.movePath(this.points,reachPellet);
            	}
            	else{
            		if(this.points.length>0&&this.points[0].i<=1){
            			this.points = [{i:1,row:this.entity.currentPos.row,col:that.entity.currentPos.col}].concat(that.points.slice(1,that.points.length));
                    }
                    else{
                    	this.points = [{i:1,row:this.entity.currentPos.row,col:that.entity.currentPos.col}].concat(that.points);
                    }
            		this.entity.movePath(this.points,reachPellet);
            	}     
            },
            
            /*
             * Pause current game
             */
            stopGame: function(){
            	this.entity.stop=true;
            	this.entity.box.stop();
            },
            
            render: function() {
                this.$el.html(this.gameTemp());

                this.game = this.$el.find('#game');

                var player = Player.create({playerId:'aplayer',playerImgSrc:'/img/kitten.png',audioWav:'/sound/kitten.wav'});
                this.entity = new EntityView({ga:this.ga,mapgrid:this.mapgrid,model:player});
                this.entity.render();
                this.game.append(this.entity.$el);

                this.newGame = true;
                return this;
            }
        });
        return GameView;
    });
