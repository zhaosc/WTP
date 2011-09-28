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
		        kind: enyo.SlidingPane,
		        flex: 1,
		        //multiViewMinWidth: 480,
		        name: "mainSlidingPane",
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
		            flex: 1,
		            kind: "WeiboTablet.StatusesView",
		            onTimelineTap: "onTimelineTap"
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
    onTimelineTap: function()
    {
    	this.$.mainSlidingPane.selectView(this.$.statusesView);
    }
});