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
    		kind: enyo.VFlexBox,
    	    components: 
    	    [{
		        kind: "SlidingPane",
		        flex: 1,
		        multiViewMinWidth: 480,
		        name: "mainSlidingPane",
		        components:
		        [{
		            name: "sidebarPane",
		            kind: "WeiboTablet.Sidebar",
		            width: "320px",
		            onHomeTap: "onHomeTap",
		            onMentionsTap: "onMentionsTap"
		        },{
		            name: "timelineView",
		            flex: 1,
		            kind: "WeiboTablet.TimelineView"
		        }]
		    }]
    	}]
    }],
    ready: function() 
    {
    	setTimeout(this.checkLoggedIn(), 1500);
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
    	this.$.pane.selectViewByName("main");
    	this.$.timelineView.refresh("friendsTimeline");
    },
    onHomeTap: function()
    {
    	this.$.timelineView.refresh("friendsTimeline");
    },
    onMentionsTap: function()
    {
    	this.$.timelineView.refresh("mentions");
    },
});