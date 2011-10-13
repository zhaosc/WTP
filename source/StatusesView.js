enyo.kind({
    name: "WeiboTablet.StatusesView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    events:
	{
    	"onTimelineTap": "",
    	"onDataGrabbed": "",
    	"onLinkClick": "doLinkClick"
	},
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
		    kind: enyo.SlidingView,
		    layoutKind: enyo.VFlexLayout,
		    components: 
		    [{
		        kind: enyo.Header,
		        className: "new_timeline",
		        layoutKind: enyo.HFlexLayout,
		        components:
		        [{
		        	content: "picture icon"
		        },{
		            kind: enyo.Input,
		            name: "newTimelineInput",
		            oninput: "countCharacters",
		            hint: "what",
		            alwaysLooksFocused: true,
		            flex: 1,
		            inputClassName: "new_timeline_input_inner",
		            className: "new_timeline_input",
		            styled: false
		        },{
		        	name: "charactersCount",
		        	content: "140 left"
		        }]
		    },{
		        name: "timelineView",
				kind: "WeiboTablet.TimelineView",
				width: "784px",
				onTimelineTap: "timelineTapped",
				onLinkClick: "doLinkClick"
		    },{
		    	name: "followersListView",
	            width: "784px",
	            showing: false,
	            kind: "WeiboTablet.DetailUserListView",
	            onLinkClick: "doLinkClick"
		    },{
		    	name: "friendsListView",
	            width: "784px",
	            showing: false,
	            kind: "WeiboTablet.DetailUserListView",
	            onLinkClick: "doLinkClick"
		    }]
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
    	if (inResponse.length > 0)
		{
			this.timeline = inResponse.concat(this.timeline);
	        
	        WeiboUtil.saveToStorage(this.type, inResponse);
	        
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
		}
    	else
		{
    		this.$.timelineView.refresh(this.timeline, this.counts);
		}
    },
    grabTimelineFailure: function(inSender, inResponse, inRequest)
    {
        this.$.timelineFailurePopup.openAtCenter();
        this.$.timelineFailureText.setContent(inResponse);
    },
    grabCountsSuccess: function(inSender, inResponse, inRequest)
    {
		this.counts = inResponse.concat(this.counts);
    	WeiboUtil.saveToStorage(this.type + "_counts", inResponse);
    	
    	this.doDataGrabbed();
    	
    	this.$.timelineView.refresh(this.timeline, this.counts);
    },
    grabCountsFailure: function(inSender, inResponse, inRequest)
    {
    	this.$.timelineFailurePopup.openAtCenter();
    	this.$.timelineFailureText.setContent(inResponse);
    },
    refresh: function(type, force)
    {
    	this.owner.$.splash.showSpinner();
    	this.type = type;
    	var count = 10;
    	this.timeline = WeiboUtil.getFromStorage(this.type);
		this.counts = WeiboUtil.getFromStorage(this.type + "_counts");
		
    	if (!this.timeline)
		{
    		this.timeline = [];
		}
    	if (!this.counts)
    	{
    		this.counts = [];
    	}
    	
    	var since_id;
		if (this.timeline.length > 0)
		{
    		since_id = this.timeline[0].id;
		}
    	
        var url;
        var userList = false;
        if (type == "friendsTimeline")
    	{
        	url = WeiboUtil.getFriendsTimelineURL(count, since_id);
    	}
        else if (type == "mentions")
    	{
        	url = WeiboUtil.getMentionsURL();
    	}
        else if (type == "favorites")
        {
        	url = WeiboUtil.getFavoritesURL();
        }
        else if (type == "statuses")
        {
        	url = WeiboUtil.getUserTimelineURL();
        }
        else if (type == "followers")
        {
        	this.$.timelineView.hide();
        	this.$.friendsListView.hide();
        	this.$.followersListView.show();
        	this.$.followersListView.refresh(WeiboUtil.getFromStorage("user").screen_name, type);
        	return;
        }
        else if (type == "friends")
        {
        	this.$.timelineView.hide();
        	this.$.followersListView.hide();
        	this.$.friendsListView.show();
        	this.$.friendsListView.refresh(WeiboUtil.getFromStorage("user").screen_name, type);
        	return;
        }
        
		this.$.timelineView.show();
		this.$.followersListView.hide();
		this.$.friendsListView.hide();
		
		if (force)
		{
			this.$.grabTimeline.setUrl(url.url);
		    this.$.grabTimeline.setHeaders(url.headers);
		    this.$.grabTimeline.call();
		}
		else
		{
			this.$.timelineView.refresh(this.timeline, this.counts);
		}
    },
    timelineTapped: function(inSender, inTimeline, inCounts)
    {
    	this.doTimelineTap();
    	this.$.commentsView.refresh(inTimeline, inCounts);
    },
    countCharacters: function()
    {
    	var length = 140 - this.$.newTimelineInput.value.length;
    	this.$.charactersCount.setContent(length + " left");
    }
});