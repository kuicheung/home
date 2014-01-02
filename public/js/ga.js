define(['lib/encog'],function(Encog){
var ga =  function (grid) {
        var genetic;
        var constCities = 0;
        var constStable = 30;
        var constPopulationSize = 500;
        var lastBest=0;
        var stableFor=0;
        var constMutationPercent = 0.1;
        var constMatePercent = 0.24;
        var constMatingPopulationPercent = 0.5;

        function startover(points)
        {
            grid.reset();
            constCities = points.length;
            genetic = ENCOG.Genetic.create();

            genetic.crossover = function performCrossover(motherArray, fatherArray, child1Array, child2Array)
            {
                // the chromosome must be cut at two positions, determine them
                // don't cut the head of the list
                var cutLength = (motherArray.length -1)/ 5;
                var cutpoint1 = (Math.floor(Math.random() * (motherArray.length - cutLength - 1)))+1;
                var cutpoint2 = cutpoint1 + cutLength;

                // keep track of which genes have been taken in each of the two
                // offspring, defaults to false.
                var taken1 = {};
                var taken2 = {};

                // handle cut section
                for (var i = 0; i < motherArray.length; i++)
                {
                    if (!((i < cutpoint1) || (i > cutpoint2)))
                    {
                        child1Array[i] = fatherArray[i];
                        child2Array[i] = motherArray[i];
                        taken1[fatherArray[i].i] = true;
                        taken2[motherArray[i].i] = true;
                    }
                }

                // handle outer sections
                for (var i = 0; i < motherArray.length; i++)
                {
                    if ((i < cutpoint1) || (i > cutpoint2))
                    {
                        child1Array[i] = getNotTaken(motherArray,taken1);
                        child2Array[i] = getNotTaken(fatherArray,taken2);
                    }
                }
            };

            genetic.mutate = function performMutation(data)
            {
                //don't swap the head of the list
                var iswap1 = (Math.floor(Math.random() * (data.length-1)))+1;
                var iswap2 = (Math.floor(Math.random() * (data.length-1)))+1;

                // can't be equal
                if (iswap1 == iswap2)
                {
                    // move to the next, but
                    // don't go out of bounds
                    if (iswap1 > 1)
                    {
                        iswap1--;
                    } else {
                        iswap1++;
                    }
                }

                var t = data[iswap1];
                data[iswap1] = data[iswap2];
                data[iswap2] = t;
            }
            genetic.scoreSolution = function(path) {
                return grid.calculatePathLength(path);
            };

            genetic.createPopulation(constPopulationSize, function()
            {
                return grid.generatePath(points);
            });
        };

        function settings(data)
        {
            constCities = data.constCities || constCities;
            constStable = data.constStable || constStable;

            constPopulationSize = data.constPopulationSize || constPopulationSize;
            constMutationPercent = data.constMutationPercent || constMutationPercent;
            constMatePercent = data.constMatePercent || constMatePercent;

            startOver();
        }

        function getNotTaken(source, taken)
        {

            for(var i=0;i<constCities;i++)
            {
                var trial = source[i];
               // console.log(trial);
                if( taken[trial.i] != true )
                {
              //      console.log(i);
                    taken[trial.i] = true;
                    return trial;
                }
            }

            return -1;
        }


        function run()
        {
            var iteration = 1;
            var startTime = new Date();
            stableFor =0;
            while (stableFor <= constStable) {
              //  console.log('animate');
                genetic.iteration();
                grid.currentPath = genetic.getSolution();
               // console.log(grid.currentPath);
                iteration++;

                var l = Math.floor(grid.calculatePathLength(grid.currentPath));
              //  console.log( "Iteration "+iteration+": Path length = " + l);


                if (l == lastBest) {
                    stableFor++;
                }
                else {
                    lastBest = l;
                    stableFor = 0;
                }
            }
            console.log('time:'+(new Date().getMilliseconds() - startTime.getMilliseconds()));
            console.log("Stable solution found after " + iteration + " iterations: Path length = " + l);
            return grid.currentPath;
        }

        return{
            run: run,
            startover: startover
        }
    }

return ga;

});