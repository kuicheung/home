/**
 * Created by Kiwi on 12/28/13.
 */
define(['text!/templates/entity.html'],
    function(entityTemp){
        var ga,mapgrid,box,player;

        var EntityView = Backbone.View.extend({
            currentPt: {row:0,col:0},
            currentPos: {row:0,col:0},
            entityTemp: _.template(entityTemp),
            initialize: function(params){
                this.model = params.model;
                ga = params.ga;
                mapgrid = params.mapgrid;
            },
            events: {
                'click #aplayer' : 'playSound'
            },
            currentCord: function(){
                var cord = {};
                cord.x = Math.floor((this.box.offset().left-this.$el.offset().left)/mapgrid.gridsize);
                cord.y = Math.floor((this.box.offset().top-this.$el.offset().top)/mapgrid.gridsize);

                return this.currentPos;
            },
            movePath: function(points,cb){
                this.stop = false;
                var i,thePath;

                this.currentPt = {row:this.currentPos.row,col:this.currentPos.col};
                if(points.length>3){
                    ga.startover(points);
                    thePath = ga.run();
                }
                else if(points.length>1){
                    thePath = points;
                }
                else{
                	cb(null,points);
                    return this;
                }

                var that = this;
                i=0;
                var move = function move(path){

                    if(path.length<1){
                        return this;
                    }
                    var p = path.shift();
                    that.moveTo(p.col,p.row,function(stop){
                        if(stop)
                            return that;
                        if(p){
                            cb(p);
                        }
                        move(path);
                    });
                };
                move(_.clone(thePath));

            },
            moveTo: function(col,row,cb){
                var nextPt,left,top;
                var path = mapgrid.finder.findPath(this.currentPt.col, this.currentPt.row, col, row, mapgrid.grid.clone());
                var gridsize = mapgrid.gridsize;

                var that = this;
                if(path.length>0)
                    this.currentPt = {col:col,row:row};

                function move(){

                    if(that.stop){
                        cb(true);
                        return that;
                    }
                    if(path.length==0){
                        cb(false);
                        return that;
                    }
                    nextPt = path.shift();
                    left = that.box.offset().left;
                    top = that.box.offset().top;

                    var cord = {left: nextPt[0]*gridsize,
                        top: nextPt[1]*gridsize};
                    that.box.animate(cord,200,'linear',move);
                    that.currentPos = {row:nextPt[1],col:nextPt[0]};

                };
                move();
            },
            render: function() {
                this.$el.html(this.entityTemp(this.model.toJSON()));
                this.box = this.$el.find('#aplayer').css({left:0,top:0,position:'absolute'});

                return this;

            },
            playSound: function(e){
                e.preventDefault;
                document.getElementById('playerSound').play();
            },
            leaveGame: function(){
                this.box.fadeOut();
            },
            overGame: function(){
                this.box.fadeIn();
            }
        });

        return EntityView;

});

