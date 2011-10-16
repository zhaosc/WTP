enyo.kind({
    name: "WeiboTablet.UserView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    events:
	{
    	"onLinkClick": ""
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
        kind: "WebService", 
        method: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        name: "grabUserShow", 
        onSuccess: "grabUserShowSuccess",
        onFailure: "grabUserShowFailure"
    },{
        kind: "WebService", 
        method: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        name: "grabFriendshipsShow", 
        onSuccess: "grabFriendshipsShowSuccess",
        onFailure: "grabFriendshipsShowFailure"
    },{
        kind: "WebService", 
        method: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        name: "grabTrends", 
        onSuccess: "grabTrendsSuccess",
        onFailure: "grabTrendsFailure"
    },{
        kind: "WebService", 
        method: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        name: "grabTags", 
        onSuccess: "grabTagsSuccess",
        onFailure: "grabTagsFailure"
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
				className: "user_header",
				onclick: "headerTapped",
				components:
				[{
					kind: enyo.HFlexBox,
					flex: 1,
					components:
					[{
						kind: enyo.Image,
						name: "profileImage",
						className: "user_profile_image"
					},{
						kind: enyo.VFlexBox,
						flex: 1,
						components:
						[{
							kind: enyo.HFlexBox,
							components:
							[{
								kind: enyo.HtmlContent,
								name: "basicInfo"
							},{
								flex: 1
							},{
								name: "followButton"
							}]
						},{
							kind: enyo.HtmlContent,
							name: "domain"
						},{
							name: "description"
						}]
					}]
				}]
			},{
				name: "timelineView",
				kind: "WeiboTablet.TimelineView",
				width: "784px",
				flex: 1,
				onTimelineTap: "timelineTapped",
				onLinkClick: "linkClicked"
			}]
		},{
        	name: "sideViewOwner",
        	kind: enyo.VFlexBox,
        	width: "240px",
        	components:
    		[{
    			name: "sideCountsView",
        		className: "user_counts",
        		kind: enyo.VFlexBox,
        		flex: 1,
            	width: "240px",
            	components:
        		[{
        			kind: enyo.HFlexBox,
        			className: "user_counts_toolbar",
        			components:
        			[{
        				kind: enyo.VFlexBox,
        				name: "statusesCount",
        				onclick: "statusesCountTapped",
        				align: "center",
        				className: "user_counts_toolbar_item_selected",
        				flex: 1,
        				components:
    					[{
            				name: "statusesCountNum" 
    					},{
    						content: "微博"
    					}]
        			},{
        				kind: enyo.VFlexBox,
        				name: "friendsCount",
        				onclick: "friendsCountTapped",
        				align: "center",
        				className: "user_counts_toolbar_item_unselected",
        				flex: 1,
        				components:
    					[{
    						name: "friendsCountNum"
    					},{
    						content: "关注"
    					}]
        			},{
        				kind: enyo.VFlexBox,
        				name: "followersCount",
        				onclick: "followersCountTapped",
        				align: "center",
        				className: "user_counts_toolbar_item_unselected",
        				flex: 1,
        				components:
    					[{
    						name: "followersCountNum"
    					},{
    						content: "粉丝"
    					}]
        			}]
        		},{
        			name: "sideViewCountsDetailOwner",
                	kind: enyo.VFlexBox,
                	flex: 1,
                	components:
            		[{
            			kind: enyo.Scroller,
            			flex: 1,
            			name: "counts",
            			components:
        				[{
        					content: "话题",
        					className: "user_counts_detail_item_header"
        				},{
        					name: "trends",
        					kind: enyo.HtmlContent,
        					className: "user_counts_detail_item"
        				},{
        					content: "标签",
    						className: "user_counts_detail_item_header"
        				},{
        					name: "tags",
        					className: "user_counts_detail_item"
        				}]
            		},{
            			kind: "WeiboTablet.UserListView",
            			name: "followersList",
            			onLinkClick: "linkClicked",
            			flex: 1,
            			showing: false
            		},{
            			kind: "WeiboTablet.UserListView",
            			name: "friendsList",
            			onLinkClick: "linkClicked",
            			flex: 1,
            			showing: false
            		}]
        		}]
    		},{
    			name: "sideCommentsView",
        		kind: "WeiboTablet.CommentsView",
            	width: "240px",
            	flex: 1,
            	showing: false
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
    redo: function(username)
    {
    	this.friendsRendered = false;
    	this.followersRendered = false;
    	
    	username = decodeURIComponent(username);
    
    	this.$.basicInfo.setContent("<span class=\"user_username\">" + username + "</span>");
    	
    	var url = WeiboUtil.getUserShowURL(username);
    	this.$.grabUserShow.setUrl(url.url);
        this.$.grabUserShow.setHeaders(url.headers);
    	this.$.grabUserShow.call();
    	
    	url = WeiboUtil.getUserTimelineURL(username);
    	this.$.grabTimeline.setUrl(url.url);
        this.$.grabTimeline.setHeaders(url.headers);
        this.$.grabTimeline.call();
        
        url = WeiboUtil.getFriendshipsShowURL(username);
        this.$.grabFriendshipsShow.setUrl(url.url);
        this.$.grabFriendshipsShow.setHeaders(url.headers);
        this.$.grabFriendshipsShow.call();
    },
    grabUserShowSuccess: function(inSender, inResponse, inRequest)
    {
    	this.user = inResponse;
    	
    	this.headerTapped();
    	
    	var url = WeiboUtil.getTrendsURL(this.user.id);
		this.$.grabTrends.setUrl(url.url);
        this.$.grabTrends.setHeaders(url.headers);
        this.$.grabTrends.call();
        
        url = WeiboUtil.getTagsURL(this.user.id);
        this.$.grabTags.setUrl(url.url);
        this.$.grabTags.setHeaders(url.headers);
        this.$.grabTags.call();
    	
    	this.$.basicInfo.setContent("<span class=\"user_username\">" + 
    			inResponse.screen_name + 
    			"</span><img class=\"gender_icon\" src=\"resources\\" + 
    			(inResponse.gender.toUpperCase() === "M" ? "m" : "f") +
    			".png\"/><span class=\"grey_text\">" + inResponse.location + "</span>");
    	this.$.profileImage.setSrc(inResponse.profile_image_url.replace("/50/", "/180/"));
    	this.$.domain.setContent("<a href=\"http://weibo.com/" + inResponse.domain +
    			"\">" + "http://weibo.com/" + inResponse.domain + "</a>");
    	this.$.description.setContent(inResponse.description);
    	this.$.statusesCountNum.setContent(inResponse.statuses_count);
    	this.$.friendsCountNum.setContent(inResponse.friends_count);
    	this.$.followersCountNum.setContent(inResponse.followers_count);
    },
    grabUserShowFailure: function(inSender, inResponse, inRequest)
    {
    	
    },
    grabFriendshipsShowSuccess: function(inSender, inResponse, inRequest)
    {
    	if (inResponse.source.following)
    	{
    		if (inResponse.source.followed_by)
			{
    			this.$.followButton.setContent("相互关注");
			}
    		else
			{
    			this.$.followButton.setContent("已关注");
			}
    		
    		this.$.followButton.setClassName("unfollow_button");
    	}
    	else
    	{
    		this.$.followButton.setContent("加关注");
    		this.$.followButton.setClassName("follow_button");
    	}
    },
    grabFriendshipsShowFailure: function(inSender, inResponse, inRequest)
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
    	
    	this.$.timelineView.redo(this.timeline, this.counts);
    },
    grabCountsFailure: function(inSender, inResponse, inRequest)
    {
    },
    grabTrendsSuccess: function(inSender, inResponse, inRequest)
    {
    	var trends = "";
    	
    	for (i in inResponse)
		{
    		trends += "<a href=\"#" + inResponse[i].hotword + "#\">" + 
    		inResponse[i].hotword + "</a>&nbsp;&nbsp;";
		}
    	
    	if (trends === "")
		{
    		trends = "没有话题";
		}
    	else
		{
    		trends = trends.substring(0, trends.length - 12);
		}
    	
    	this.$.trends.setContent(trends);
    },
    grabTrendsFailure: function(inSender, inResponse, inRequest)
    {
    },
    grabTagsSuccess: function(inSender, inResponse, inRequest)
    {
    	var tags = "";
    	
    	for (i in inResponse)
    	{
    		var p = inResponse[i];
    		
    		for (var k in p) 
    		{
    			if (p.hasOwnProperty(k) && p[k]) 
    			{ 
    				tags += p[k] + "  ";
    			}
    		}
    	}
    	
    	if (tags === "")
    	{
    		tags = "没有标签";
    	}
    	else
    	{
    		tags = tags.substring(0, tags.length - 2);
    	}
    	
    	this.$.tags.setContent(tags);
    },
    grabTagsFailure: function(inSender, inResponse, inRequest)
    {
    	
    },
    linkClicked: function(inSender, inUrl)
    {
    	this.doLinkClick(inUrl);
    },
    timelineTapped: function(inSender, inTimeline, inCounts)
    {
    	this.$.sideCountsView.hide();
    	this.$.sideCommentsView.show();
    	this.$.sideCommentsView.redo(inTimeline, inCounts);
    },
    headerTapped: function(inSender, inEvent) 
    {
    	this.$.sideCountsView.show();
    	this.$.sideCommentsView.hide();
    	this.statusesCountTapped();
    },
    statusesCountTapped: function(inSender, inEvent)
    {
    	this.$.statusesCount.addClass("user_counts_toolbar_item_selected");
    	this.$.statusesCount.removeClass("user_counts_toolbar_item_unselected");
    	this.$.friendsCount.addClass("user_counts_toolbar_item_unselected");
    	this.$.friendsCount.removeClass("user_counts_toolbar_item_selected");
    	this.$.followersCount.addClass("user_counts_toolbar_item_unselected");
    	this.$.followersCount.removeClass("user_counts_toolbar_item_selected");
    	
    	this.$.counts.show();
    	this.$.friendsList.hide();
		this.$.followersList.hide();
    },
    friendsCountTapped: function(inSender, inEvent)
    {
    	this.$.statusesCount.addClass("user_counts_toolbar_item_unselected");
    	this.$.statusesCount.removeClass("user_counts_toolbar_item_selected");
    	this.$.friendsCount.addClass("user_counts_toolbar_item_selected");
    	this.$.friendsCount.removeClass("user_counts_toolbar_item_unselected");
    	this.$.followersCount.addClass("user_counts_toolbar_item_unselected");
    	this.$.followersCount.removeClass("user_counts_toolbar_item_selected");
    	
		this.$.counts.hide();
		this.$.followersList.hide();
    	
		this.$.friendsList.show();
		
    	if (!this.friendsRendered)
		{
    		this.$.friendsList.redo(this.user.screen_name, "friends");
    		this.friendsRendered = true;
		}
    },
    followersCountTapped: function(inSender, inEvent)
    {
    	this.$.statusesCount.addClass("user_counts_toolbar_item_unselected");
    	this.$.statusesCount.removeClass("user_counts_toolbar_item_selected");
    	this.$.friendsCount.addClass("user_counts_toolbar_item_unselected");
    	this.$.friendsCount.removeClass("user_counts_toolbar_item_selected");
    	this.$.followersCount.addClass("user_counts_toolbar_item_selected");
    	this.$.followersCount.removeClass("user_counts_toolbar_item_unselected");
    	
		this.$.counts.hide();
		this.$.friendsList.hide();
    	
		this.$.followersList.show();
		
    	if (!this.followersRendered)
		{
    		this.$.followersList.redo(this.user.screen_name, "followers");
    		this.followersRendered = true;
		}
    }
});