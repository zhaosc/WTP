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
            style: "font-size: 0.8em; text-align: justify",
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
    }],
    ready: function()
    {
        this.timeline = [];
        this.counts = [];
        
        var url = WeiboUtil.get("statuses/friends_timeline.json");
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
        
        var url = WeiboUtil.get("statuses/counts.json", "ids=" + ids);
        this.$.grabCounts.setUrl(url);
        this.$.grabCounts.call();
    },
    grabTimelineFailure: function()
    {
        this.$.timelineFailurePopup.openAtCenter();
        this.$.timelineFailureText.setContent("Update failed. Please try again.");
    },
    grabCountsSuccess: function(inSender, inResponse, inRequest)
    {
    	this.counts = inResponse;
    	this.$.timelineView.$.timeline.render();
    },
    grabCountsFailure: function()
    {
    	this.$.timelineFailurePopup.openAtCenter();
    	this.$.timelineFailureText.setContent("Update failed. Please try again.");
    }
});