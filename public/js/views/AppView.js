define(['text!/public/templates/footer.html',
        'Router',
        'NavbarView',
        'PageView','Pages',
        'ChatboxView','Chatbox'],
        function(footerTemplate,
        		Router,
        		NavbarView,
        		PageView,Pages,
        		ChatboxView,Chatbox) {
	
	var AppView = Backbone.View.extend({
    el: $("#iqtest"),
    footerTemplate: _.template(footerTemplate),
    events: {
    	
    },
    initialize: function() {
    	
      this.header = $('header');
      this.footer = $('footer');
      this.main = $('#main');
      this.sidebar = $('#sidebar');
      
      Backbone.history.start();   
      this.pages = new Pages;
      console.log(this.pages);
      this.pageView = new PageView({pages:this.pages});
      this.router = new Router(this.pageView);
      this.main.html(this.pageView.$el);
      
      this.navbarView = new NavbarView({pages:this.pages,router:this.router});     
      this.header.html(this.navbarView.render().el);
      
      this.chatboxModel = new Chatbox();
      this.chatboxView = new ChatboxView({model:this.chatboxModel});
                   
      this.sidebar.append(this.chatboxView.render().$el);

      this.render();

      var url = Backbone.history.fragment?Backbone.history.fragment:'home';
      this.navbarView.setActive(url);
      this.router.navigate('#/'+url,true);

    },
    changeImg: function(e){
    	$('#project #body #main-img').attr('src',e.target.src);
    },
    render: function() {
        this.footer.html(this.footerTemplate());        
    }
  });
  return AppView;
 });
