enyo.kind
({
    name: "WeiboTablet.MainView",
    kind: enyo.VFlexBox,
    components: 
    [{
    	name: "pane", 
    	kind: enyo.Pane, 
    	flex: 1, 
    	components:
		[{
			name: "splash",
			kind: "WeiboTablet.Splash"
		},{
			name: "login",
			kind: "WeiboTablet.Login",
			onLoggedIn: "onLoggedIn"
		},{
			name: "main",
			flex: 1,
    		kind: enyo.VFlexBox,
    	    components: 
    	    [{
		        kind: enyo.SlidingPane,
		        flex: 1,
		        name: "mainSlidingPane",
		        components:
	        	[{
	        		kind: enyo.SlidingView,
	        		peekWidth:0,
		            minWidth: 0,
		            width: "1264px",
	        	    components:
        	    	[{
        	    		kind: enyo.VFlexBox,
        	    		flex: 1,
        	    	    components: 
        	    	    [{
	        	    		kind: enyo.SlidingPane,
	        	    		flex: 1,
	        	    		name: "statuesesSlidingPane",
	    			        components:
	    			        [{
	    			            name: "sidebarPane",
	    			            kind: "WeiboTablet.Sidebar",
	    			            width: "240px",
	    			            peekWidth: 0,
	    			            onHomeTap: "onHomeTap",
	    			            onMentionsTap: "onMentionsTap",
	    			            onFavoritesTap: "onFavoritesTap"
	    			        },{
	    			            name: "statusesView",
	    			            width: "1024px",
	    			            peekWidth:0,
	    			            kind: "WeiboTablet.StatusesView",
	    			            onTimelineTap: "timelineTapped",
	    			            onDataGrabbed: "dataGrabbed",
	    			            onLinkClick: "linkClicked"
	    			        }]
        	    	    }]
        	    	}]
	        	},{
		        	name: "userView",
		            peekWidth:0,
		            minWidth: 0,
		            kind: "WeiboTablet.UserView"
	        	}]
		    }]
    	}]
    }],
    ready: function() 
    {
    	setTimeout("this.enyo.$.mainView.checkLoggedIn()", 1500);
    },
    checkLoggedIn: function()
    {
    	// TODO use user validation
    	var userInfo = WeiboUtil.getUserInfo();
		if (userInfo.length == 0)
		{
			this.$.pane.selectViewByName("login");
		}
		else
		{
			this.onLoggedIn();
		}
    },
    onLoggedIn: function()
    {
    	this.$.statusesView.refresh("friendsTimeline");
    },
    onHomeTap: function()
    {
    	this.$.statusesView.refresh("friendsTimeline");
    },
    onMentionsTap: function()
    {
    	this.$.statusesView.refresh("mentions");
    },
    onFavoritesTap: function()
    {
    	this.$.statusesView.refresh("favorites");
    },
    timelineTapped: function()
    {
    	this.$.statuesesSlidingPane.selectView(this.$.statusesView);
    },
    dataGrabbed: function()
    {
    	this.$.pane.selectViewByName("main");
    },
    linkClicked: function(inSender, inUrl)
    {
    	if (inUrl.indexOf("@") != -1)
		{
    		var username = inUrl.substring(inUrl.indexOf("@") + 1);
    		this.$.userView.refresh(username);
    		this.$.mainSlidingPane.selectView(this.$.userView);
		}
    }
});