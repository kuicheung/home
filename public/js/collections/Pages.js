define(['text!/public/templates/homeContent.html',
        'text!/public/templates/resumeContent.html',
        'text!/public/partials/bart-tracker.html',
        'text!/public/partials/kinect-nnet.html',
        'text!/public/partials/siquoia.html',
        'Page'],
        function(homeContent,
        		resumeContent,
        		bartTrackerContent,
        		kinectNnetContent,
        		siquoiaContent,
        		Page
        		){
var Pages = Backbone.Collection.extend({
	model: Page,
	initialize: function(){
		this.add([
		          {id:'home',	
					title:'Home Page',
					body:homeContent,
					tabName:'Home',
					linkName:'Home',
					indexPage: true
		          },
		          {id:'resume',	
						title:'R&#xE9;sum&#xE9;',
						body:resumeContent,
						tabName:'Resume',
						tabIndex: 1,
						linkName:'R&#xE9;sum&#xE9;'
		          },
         		{id:'bart-tracker',	
	         		title:'Bart Tracker',
	     			body:bartTrackerContent,
	     			tabName:'Project',
	     			tabIndex:0,
					linkName:'Bart Tracker'
     			},
     			{id: 'kinect-nnet',
     			title:'Kinect Neural Net',
     			body:kinectNnetContent,
     			tabName:'Project',
     			tabIndex:0,
				linkName:'Kinect Neural Net'
     			},
     			{id: 'siquoia',
     			title:'Siquoia Quiz System',
     			body:siquoiaContent,
     			tabName:'Project',
     			tabIndex:0,
				linkName:'Siquoia Quiz System'
     			}]);
	},
});
return Pages;
});