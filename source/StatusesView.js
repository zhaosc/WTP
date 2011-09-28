enyo.kind({
    name: "WeiboTablet.StatusesView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    events:
	{
    	"onTimelineTap": ""
	},
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
    	kind: enyo.HFlexBox,
    	flex: 1,
    	components:
		[{
			name: "timelineView",
			kind: "WeiboTablet.TimelineView",
			width: "784px",
			onTimelineTap: "timelineTapped"
	    },{
        	name: "commentsView",
        	kind: "WeiboTablet.CommentsView",
        	width: "240px"
	    }]
    },{
        kind: enyo.Toolbar,
        pack: "justify",
        components:
        [{
            kind: enyo.GrabButton
        },{
            flex: 1
        }]
    }],
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
        
        var url = WeiboUtil.getCountsURL(ids);
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
    	this.$.timelineView.refresh(this.timeline, this.counts);
    },
    grabCountsFailure: function(inSender, inResponse, inRequest)
    {
    	this.$.timelineFailurePopup.openAtCenter();
    	this.$.timelineFailureText.setContent(inResponse);
    },
    refresh: function(type)
    {
        var url;
        if (type == "friendsTimeline")
    	{
        	url = WeiboUtil.getFriendsTimelineURL();
    	}
        else if (type == "mentions")
    	{
        	url = WeiboUtil.getMentionsURL();
    	}
        else if (type == "favorites")
        {
        	url = WeiboUtil.getFavoritesURL();
        }
        
        this.$.grabTimeline.setUrl(url);
        this.$.grabTimeline.call();
    },
    timelineTapped: function(inSender, inTimeline)
    {
    	this.doTimelineTap();
    	this.$.commentsView.refresh(inTimeline);
    }
});