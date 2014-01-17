requirejs.config({
	//baseUrl: 'http://static.kuicheung.com/public/js/',
    paths: {
    	'jquery' : 'lib/jquery_1_10',
        'jquery_ui' : 'lib/jquery-ui',
        'dataTables' : 'lib/jquery.dataTables.min',
        'io' : 'lib/socket.io',
        'chatroom' : 'chatroom',
        'AppView' : 'views/AppView',
        'underscore' : 'lib/underscore_min',
        'Backbone' : 'lib/backbone_min',
        'Router' : 'router',
        'Bootstrap' : 'lib/bootstrap.min',
        'Pages' : 'collections/Pages',
        'NavbarView' : 'views/NavbarView',
        'Page' : 'models/Page',
        'PageView' : 'views/PageView',
        'ChatboxView' : 'views/ChatboxView',
        'Chatbox' : 'models/Chatbox',
        'PF' : 'lib/pathfinding-min',
        'lod' : 'lib/lodash',
        'nivoSlider':'lib/jquery.nivo.slider'
    }
});

// Start the main app logic.
requirejs(['jquery','io','jquery_ui', 
           'dataTables', 'chatroom','underscore',
           'Backbone', 'AppView','Bootstrap',
           'PF','lod','jquery'],
function   ($,       io,  jquery_ui,   
			dataTables,   chatroom,  _,           
			Backbone,   AppView,  Bootstrap,
			PF,lod) {
    new AppView;
    
    
});