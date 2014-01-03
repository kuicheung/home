define(['text!/templates/homeContent.html',
        'text!/templates/resumeContent.html',
        'text!/partials/bart-tracker.html',
        'text!/partials/kinect-nnet.html',
        'text!/partials/siquoia.html',
        'text!/partials/shooter.html',
        'Page'],
        function(homeContent,
        		resumeContent,
        		bartTrackerContent,
        		kinectNnetContent,
        		siquoiaContent,
        		shooter,
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
     			},
     			{id: 'shooter',
         			title:'3rd Person Shooter',
         			body:shooter,
         			tabName:'Project',
         			tabIndex:0,
    				linkName:'3rd Person Shooter'
         			}
     			]);
	},
});
return Pages;
});