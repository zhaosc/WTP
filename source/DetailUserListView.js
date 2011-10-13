enyo.kind({
	name: "WeiboTablet.DetailUserListView",
	kind: enyo.VFlexBox,
    flex: 1,
	events:
	{
    	"onLinkClick": ""
	},
	components:
	[{
        kind: "WebService", 
        method: "POST",
        name: "grabUserList", 
        onSuccess: "grabUserListSuccess",
        onFailure: "grabUserListFailure"
    },{
        kind: "WebService", 
        method: "POST",
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
    	kind: enyo.Scroller,
    	flex: 1,
    	name: "userList",
    	components:
		[{
			kind: enyo.VirtualRepeater,
	        onSetupRow: "setupContent",
	        components:
	        [{
	            kind: enyo.Item,
	            layoutKind: enyo.HFlexLayout,
	            onclick: "userTapped",
	            className: "detail_user_item",
				components:
				[{
					kind: enyo.Image, 
		            name: "profileImage",
				},{
					kind: enyo.VFlexbBox,
					className: "detail_user_text",
					flex: 1,
					components:
					[{
						kind:enyo.HFlexBox,
						components:
						[{
							name: "username",
							className: "timeline_username",
						},{
							flex: 1
						},{
							name: "followButton"
						}]
					},{
						kind: enyo.HFlexBox,
						components:
						[{
							kind: enyo.Image,
							className: "gender_icon",
							name: "gender"
						},{
							name: "location",
							style: "paading-right: 10px;"
						},{
							name: "followersCount",
							content: "粉丝数"
						}]
					},{
						name: "status",
						className: "grey_text"
					}]
				}]
	        }]
		}]
	}],
	refresh: function(screenName, type)
	{
		if (!this.users)
		{
			var limit = 1;
			this.users = undefined;
			var url;
			
			if (type === "friends")
			{
				url = WeiboUtil.getFriendsIdsURL(screenName, limit);
			}
			else if (type === "followers")
			{
				url = WeiboUtil.getFollowersIdsURL(screenName, limit);
			}
			
			this.$.grabUserList.setUrl(url.url);
			this.$.grabUserList.setHeaders(url.headers);
			this.$.grabUserList.call();
		}
	},
	setupContent: function(inSender, inIndex)
	{
		if (this.users && inIndex < this.gotUsers)
		{
			var source;
			
			for (i in this.friendships)
			{
				if (this.friendships[i].target.id == this.users[inIndex].id)
				{
					source = this.friendships[i].source;
					break;
				}
			}
			
			if (source)
			{
				this.$.username.setContent(this.users[inIndex].screen_name);
				this.$.location.setContent(this.users[inIndex].location);
				this.$.followersCount.setContent("粉丝数：" + this.users[inIndex].followers_count);
				this.$.profileImage.setSrc(this.users[inIndex].profile_image_url);
				this.$.gender.setSrc("resources\\" + 
		    			(this.users[inIndex].gender.toUpperCase() === "M" ? "m" : "f") +
		    			".png");
				this.$.status.setContent(this.users[inIndex].status.text);
				
				if (source.following)
		    	{
		    		if (source.followed_by)
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
				
				return true;
			}
			
			return false;
		}
		else
		{
			return false;
		}
	},
	grabUserListSuccess: function(inSender, inResponse, inRequest)
	{
		this.ids = inResponse;
		
		this.validUsers = this.ids.ids.length;
		this.validFriendships = this.ids.ids.length;
		
		for (i in this.ids.ids)
		{
			if (i > this.ids.ids.length - 1)
			{
				break;
			}
			
			var url = WeiboUtil.getUserShowURL(undefined, this.ids.ids[i]);
	    	this.$.grabUserShow.setUrl(url.url);
	        this.$.grabUserShow.setHeaders(url.headers);
	    	this.$.grabUserShow.call();
	    	
	    	url = WeiboUtil.getFriendshipsShowURL(undefined, this.ids.ids[i]);
	        this.$.grabFriendshipsShow.setUrl(url.url);
	        this.$.grabFriendshipsShow.setHeaders(url.headers);
	        this.$.grabFriendshipsShow.call();
		}
	},
	grabUserListFailure: function()
	{
		
	},
	grabUserShowSuccess: function(inSender, inResponse, inRequest)
	{
		if (this.gotUsers)
		{
			this.gotUsers++;
		}
		else
		{
			this.users = [];
			this.gotUsers = 1;
		}
		
		if (inResponse.error)
		{
			grabUserShowFailure(inSender, inResponse, inRequest);
		}
		else
		{
			this.users.push(inResponse);
		}
		
		if (this.gotUsers == this.validUsers && 
			this.gotFriendships == this.validFriendships)
		{
			this.$.userList.render();
		}
	},
	grabUserShowFailure: function(inSender, inResponse, inRequest)
	{
		this.validUsers--;
		enyo.log("total: " + this.validUsers + ", response: " + inResponse.toString());
	},
    grabFriendshipsShowSuccess: function(inSender, inResponse, inRequest)
    {
    	if (this.gotFriendships)
		{
			this.gotFriendships++;
		}
		else
		{
			this.friendships = [];
			this.gotFriendships = 1;
		}
    	
		this.friendships.push(inResponse);
		
		if (this.gotUsers == this.validUsers && 
			this.gotFriendships == this.validFriendships)
		{
			this.$.userList.render();
		}
    },
    grabFriendshipsShowFailure: function(inSender, inResponse, inRequest)
    {
    	this.validFriendships--;
    	enyo.log("total: " + this.validFriendships + ", response: " + inResponse.toString());
    },
	userTapped: function(inSender, inEvent, inIndex)
	{
		this.doLinkClick("@" + this.users[inIndex].screen_name);
	}
});