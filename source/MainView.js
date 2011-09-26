enyo.kind
({
    name: "WeiboTablet.MainView",
    kind: enyo.VFlexBox,
    components: 
    [{
        kind: "WebService", 
        name: "grabTimeline", 
        onSuccess: "grabTimelineSuccess",
        onFailure: "grabTimelineFailure"
    },{
        kind: "WebService", 
        name: "grabCounts", 
        onSuccess: "grabCountsSuccess",
        onFailure: "grabCountsFailure"
    },{
        kind: "Popup",
        name: "timelineFailurePopup",
        components:
        [{
            style: "font-size: 1.1em; text-align: center;",
            content: "Trouble getting feed"
        },{
            style: "font-size: 0.8em; text-align: justify;",
            width: "320px",
            components:
            [{
                name: "timelineFailureText"
            }]
        },{
            kind: enyo.Button,
            caption: "OK",
            onclick: "closeTimelineFailurePopup"
        }]
    },{
    	name: "pane", 
    	kind: enyo.Pane, 
    	flex: 1, 
    	components:
		[{
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
		            width: "320px",
		            kind: "WeiboTablet.Sidebar"
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
    	this.userInfo = localStorage.getItem("userInfo");
		
		if (this.userInfo == undefined)
		{
			this.userInfo = [];
			this.$.pane.selectViewByName("login");
		}
		else
		{
			this.onLoggedIn();
		}
    	//this.$.pane.selectViewByName("login");
    },
    onLoggedIn: function(userInfo)
    {
    	this.$.pane.selectViewByName("main");
    	
    	this.timeline = [];
        this.counts = [];
        this.userInfo = JSON.parse(this.userInfo)[0];
        
        var url = WeiboUtil.getFriendsTimelineURL(this.userInfo.accessToken,
        										  this.userInfo.accessTokenSecret);
        this.$.grabTimeline.setUrl(url);
        this.$.grabTimeline.call();
    },
    grabTimelineSuccess: function(inSender, inResponse, inRequest)
    {
        this.timeline = inResponse;
        
        var ids = "";
        for (var i = 0; i < inResponse.length; i++)
        {
        	ids += inResponse[i].id + ",";
        	
        	if (inResponse[i].retweeted_status)
    		{
        		ids += inResponse[i].retweeted_status.id + ",";
    		}
        }
        
        ids = ids.substring(0, ids.length - 1);
        
        var url = WeiboUtil.getCountsURL(this.userInfo.accessToken,
				  						 this.userInfo.accessTokenSecret, 
				  						 ids);
        this.$.grabCounts.setUrl(url);
        this.$.grabCounts.call();
    },
    grabTimelineFailure: function(inSender, inResponse, inRequest)
    {
        this.$.timelineFailurePopup.openAtCenter();
        this.$.timelineFailureText.setContent(inResponse);
    },
    grabCountsSuccess: function(inSender, inResponse, inRequest)
    {
    	this.counts = inResponse;
    	this.$.timelineView.$.timeline.render();
    },
    grabCountsFailure: function(inSender, inResponse, inRequest)
    {
    	this.$.timelineFailurePopup.openAtCenter();
    	this.$.timelineFailureText.setContent(inResponse);
    }
});