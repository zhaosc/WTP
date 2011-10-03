enyo.kind({
    name: "WeiboTablet.UserView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    components: 
    [{
        kind: "WebService", 
        name: "grabTimeline", 
        method: "POST",
        onSuccess: "grabTimelineSuccess",
        onFailure: "grabTimelineFailure"
    },{
        kind: "WebService", 
        name: "grabCounts", 
        method: "POST",
        onSuccess: "grabCountsSuccess",
        onFailure: "grabCountsFailure"
    },{
        kind: "WebService", 
        method: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        name: "grabUserShow", 
        onSuccess: "grabUserShowSuccess",
        onFailure: "grabUserShowFailure"
    },{
    	kind: enyo.HFlexBox,
    	flex: 1,
    	components:
		[{
			kind: enyo.VFlexBox,
			flex: 1,
			components:
			[{
				kind: enyo.Header,
				name: "username", 
				content: ""
			},{
				name: "timelineView",
				kind: "WeiboTablet.TimelineView",
				width: "784px",
				flex: 1,
				onTimelineTap: "timelineTapped",
				onLinkClick: "linkClicked"
			}]
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
    refresh: function(username)
    {
    	username = decodeURIComponent(username);
    	this.$.username.setContent(username);
    	
    	var url = WeiboUtil.getUserShowURL(username);
    	this.$.grabUserShow.setUrl(url.url);
        this.$.grabUserShow.setHeaders(url.headers);
    	this.$.grabUserShow.call();
    	
    	url = WeiboUtil.getUserTimelineURL(username);
    	this.$.grabTimeline.setUrl(url.url);
        this.$.grabTimeline.setHeaders(url.headers);
        this.$.grabTimeline.call();
    },
    grabUserShowSuccess: function(inSender, inResponse, inRequest)
    {
    	this.$.username.setContent(inResponse.screen_name);
    },
    grabUserShowFailure: function(inSender, inResponse, inRequest)
    {
    	
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
        
        var url = WeiboUtil.getCountsURL(ids);
        this.$.grabCounts.setUrl(url.url);
        this.$.grabCounts.setHeaders(url.headers);
        this.$.grabCounts.call();
    },
    grabTimelineFailure: function(inSender, inResponse, inRequest)
    {
    },
    grabCountsSuccess: function(inSender, inResponse, inRequest)
    {
    	this.counts = inResponse;
    	
    	this.$.timelineView.refresh(this.timeline, this.counts);
    },
    grabCountsFailure: function(inSender, inResponse, inRequest)
    {
    },
    timelineTapped: function(inSender, inTimeline, inCounts)
    {
    	
    },
    linkClicked: function(inSender, inUrl)
    {
    	
    }
});