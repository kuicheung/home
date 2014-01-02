define(['text!/public/templates/navbar.html'],
        function(navbarTemplate){
	var ProjectLink = Backbone.View.extend({
    tagName: 'div',
    navbarTemplate: _.template(navbarTemplate),
    initialize: function(params){
    	this.pages = params.pages;
    	this.router = params.router;
    },
    events: {
    	'click a' : 'clicked',
    },
    clicked: function(e){
    	
    	var dest = $(e.target).attr('dest');
    	
    	
    	if(dest){
    		this.setActive(dest);
    		this.router.navigate(''+$(e.target).attr('dest'),true);
    	}
    		
    },
    setActive:function(pageId){
    	if(this.currentPage)
    		this.currentPage.isActive = false;
    	this.currentPage = this.pages.get(pageId);
    	this.currentPage.isActive = true;
    	
    	this.render();
    },
    render: function() {
    	//console.log(this.pages.where({indexPage:true})[0].isActive);
    	this.$el.html(this
    			.navbarTemplate(
    					{indexPageId:'home',
						tabs:[
							  {dropdown:true,
								name:'Project',
								pages:this.pages.where({tabName:'Project'})
							  },
							  {dropdown:false,
								page:this.pages.where({tabName:'Resume'})
						  	  }]
						}));
    	return this;
    }
  });
  return ProjectLink;
 });
