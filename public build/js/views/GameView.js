define(["text!../../templates/game.html","models/Player","text!../../img/game/park2.json","grid","ga","views/EntityView"],function(e,t,n,r,i,s){var o=Backbone.View.extend({tagName:"div",currentPt:[0,0],gameTemp:_.template(e),initialize:function(){this.mapgrid=new r(30,50,16,n),this.ga=new i(this.mapgrid)},events:{"click #aplayer":"playSound","click #but-start":"startGame","click #but-stop":"stopGame","click #but-reset":"resetGame","mouseover #game":"mouseoverGame","mouseleave #game":"mouseleaveGame"},generatePellets:function(e){var t,n,r,i,s,o=[],u=[];for(t=0;t<10;t++){do n=Math.round(Math.random()*(this.mapgrid.tilesAry.length-1));while(this.mapgrid.tilesAry[n]>0);i=n%50,r=Math.floor(n/50),u[t]={row:r,col:i}}e&&o.push({i:1,row:e.row,col:e.col});for(t=0;t<u.length;t++)index=t+"",y=Math.floor(u[t].row*this.mapgrid.gridsize),x=Math.floor(u[t].col*this.mapgrid.gridsize),s=$('<img class="pellet" src="/img/game/bass.png"/>').css({top:y,left:x}),this.game.append(s),o.push({i:t+2,row:u[t].row,col:u[t].col,pelletImg:s});return o},contentClicked:function(e){var t=this.gridsize,n=Math.floor((e.clientX-this.game.offset().left)/t),r=Math.floor((e.clientY+$(document).scrollTop()-this.game.offset().top)/t);this.moveTo(n,r)},mouseoverGame:function(){console.log("mouseover")},mouseleaveGame:function(){console.log("mouseleave")},resetGame:function(){this.stopGame(),$(".pellet").remove(),this.newGame=!0},startGame:function(){var e=this,t=function(t){t&&t.pelletImg&&(t.pelletImg.remove(),e.points=_.without(e.points,t));if(e.points.length<1||e.points.length==1&&e.points[0].i==1)e.newGame=!0,e.startGame()};this.newGame?(this.newGame=!1,this.points=this.generatePellets(this.entity?this.entity.currentPos:{col:0,row:0}),this.entity.movePath(this.points,t)):(this.points.length>0&&this.points[0].i<=1?this.points=[{i:1,row:this.entity.currentPos.row,col:e.entity.currentPos.col}].concat(e.points.slice(1,e.points.length)):this.points=[{i:1,row:this.entity.currentPos.row,col:e.entity.currentPos.col}].concat(e.points),this.entity.movePath(this.points,t))},stopGame:function(){this.entity.stop=!0,this.entity.box.stop()},render:function(){this.$el.html(this.gameTemp()),this.game=this.$el.find("#game");var e=t.create({playerId:"aplayer",playerImgSrc:"/img/kitten.png",audioWav:"/public/sound/kitten.wav"});return this.entity=new s({ga:this.ga,mapgrid:this.mapgrid,model:e}),this.entity.render(),this.game.append(this.entity.$el),this.newGame=!0,this}});return o});