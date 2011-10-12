enyo.kind({
	name: "WeiboTablet.UserListView",
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
	            className: "userList_user",
	            layoutKind: enyo.HFlexLayout,
	            onclick: "userTapped",
				components:
				[{
					kind: enyo.Image, 
		            name: "profileImage",
		            className: "comments_avatar"
				},{
					kind: enyo.VFlexbBox,
					flex: 1,
					components:
					[{
						name: "username"
					},{
						kind: enyo.HFlexBox,
						components:
						[{
							kind: enyo.Image,
							className: "gender_icon",
							name: "gender"
						},{
							name: "location"
						}]
					},{
						name: "counts"
					}]
				}]
	        }]
		}]
	}],
	refresh: function(screenName, type)
	{
		var limit = 10;
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
	},
	setupContent: function(inSender, inIndex)
	{
		if (this.users && inIndex < this.total)
		{
			this.$.username.setContent(this.users[inIndex].screen_name);
			this.$.location.setContent(this.users[inIndex].location);
			this.$.counts.setContent("粉丝数：" + this.users[inIndex].followers_count);
			this.$.profileImage.setSrc(this.users[inIndex].profile_image_url);
			this.$.gender.setSrc("resources\\" + 
	    			(this.users[inIndex].gender.toUpperCase() === "M" ? "m" : "f") +
	    			".png");
			return true;
		}
		else
		{
			return false;
		}
	},
	grabUserListSuccess: function(inSender, inResponse, inRequest)
	{
		this.ids = inResponse;
		
		this.total = this.ids.ids.length;
		
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
		}
	},
	grabUserListFailure: function()
	{
		
	},
	grabUserShowSuccess: function(inSender, inResponse, inRequest)
	{
		if (!this.users)
		{
			this.users = [];
		}
		
		if (inResponse.error)
		{
			grabUserShowFailure(inSender, inResponse, inRequest);
		}
		else
		{
			this.users.push(inResponse);
		}
		
		if (this.users.length == this.total)
		{
			this.$.userList.render();
		}
	},
	grabUserShowFailure: function(inSender, inResponse, inRequest)
	{
		this.total = this.total - 1;
		// retry at later stage
		enyo.log("total: " + this.total + ", response: " + inResponse.toString());
	},
	userTapped: function(inSender, inEvent, inIndex)
	{
		this.doLinkClick("@" + this.$.username);
	}
});