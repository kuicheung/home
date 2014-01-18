/**
 * Created by Kiwi on 12/27/13.
 */
define(['lib/pathfinding-min'],
    function(PF,tilesJson){

    var mapgrid = function(rows,cols,gridsize,tilesJson){
    var pathLength = 0;
    var subpaths = {};

        var tiles = JSON.parse(tilesJson);
        var tilesAry = tiles.layers[1].data;
        var ct = 0;
        var matrix = [];
        for(var ct1=0;ct1<rows;ct1++){
            var row = [];
            for(var ct2=0;ct2<cols;ct2++){
                if(tilesAry[ct++]>0)
                    row[ct2]= 1;
                else
                    row[ct2]=0;
            }
            matrix.push(row);
        }

       // console.log(matrix);
        var grid = new PF.Grid(cols, rows, matrix);

        var finder = new PF.AStarFinder({allowDiagonal: true});
        return{
            reset: function(){
                subpaths = {};
            },
            calculatePathLength: function(path){
                var i,startPt,endPt,subpath
                    ,distance=0;

                startPt = path[0];
                for(i=1;i<path.length;i++){
                    endPt = path[i];

                    // cache subpaths
                    if(!subpaths[startPt.i+'to'+endPt.i]){
                        subpath = finder.findPath(startPt.col, startPt.row, endPt.col, endPt.row, grid.clone());
                        subpaths[startPt.i+'to'+endPt.i] = subpath;
                    }
                    else
                        subpath = subpaths[startPt.i+'to'+endPt.i];

                    distance += subpath.length>0?subpath.length-1:0;
                    startPt= endPt;
                }
                return distance;

            },
            generatePath: function(points){
                var path = _.clone(points);

                pathLength = points.length;
                var i=0,randomPath=[],randIndex,temp;

                //randomize path
                randomPath.push(path.shift());
                while(path.length>0){

                    randIndex = Math.round(Math.random()*(path.length-1));
                    temp = path[randIndex];
                    path[randIndex] = path[0];
                    path[0] = temp;
                    randomPath.push(path.shift());
                }

                return randomPath;
            },
            pathLength: pathLength,
            tilesAry: tilesAry,
            finder:finder,
            grid: grid,
            gridsize: gridsize
        }
    };

    return mapgrid;
})