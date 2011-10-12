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
	    			            name: "sidebar",
	    			            kind: "WeiboTablet.Sidebar",
	    			            width: "240px",
	    			            peekWidth: 0,
	    			            onHomeTap: "onHomeTap",
	    			            onMentionsTap: "onMentionsTap",
	    			            onFavoritesTap: "onFavoritesTap",
	    			            onStatusesTap: "onStatusesTap",
	    			    		onFollowersTap: "onFollowersTap",
	    			    		onFriendsTap: "onFriendsTap"
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
		            peekWidth: 0,
		            minWidth: 0,
		            kind: "WeiboTablet.UserView",
		            onLinkClick: "linkClicked"
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
		if (WeiboUtil.getFromStorage("access"))
		{
			this.onLoggedIn();
		}
		else
		{
			this.$.pane.selectViewByName("login");
		}
    },
    onLoggedIn: function()
    {
    	this.$.sidebar.refresh();
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
    onStatusesTap: function()
    {
    	this.$.statusesView.refresh("statuses");
    },
    onFollowersTap: function()
    {
    	this.$.statusesView.refresh("followers");
    },
    onFriendsTap: function()
    {
    	this.$.statusesView.refresh("friends");
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