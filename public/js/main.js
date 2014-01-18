requirejs.config({
	baseUrl: 'http://kuicheung-home-page.s3-website-us-east-1.amazonaws.com/js/',
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
<<<<<<< HEAD
<<<<<<< HEAD
        'nivoSlider' : 'lib/jquery.nivo.slider'
=======
        'nivoSlider':'lib/jquery.nivo.slider'
>>>>>>> 9da89eb6f695adda3c258d70fbf104fb6c38ad31
=======
        'nivoSlider':'lib/jquery.nivo.slider'
>>>>>>> 9da89eb6f695adda3c258d70fbf104fb6c38ad31
    }
});

// Start the main app logic.
requirejs(['jquery','io','jquery_ui', 
           'dataTables', 'chatroom','underscore',
           'Backbone', 'AppView','Bootstrap',
           'PF','lod','nivoSlider'],
function   (jquery,io,  jquery_ui,   
			dataTables,   chatroom,  _,           
			Backbone,   AppView,  Bootstrap,
			PF,lod,nivoSlider) {
    new AppView;
    
    
});