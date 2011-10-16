enyo.kind({
	name: "WeiboTablet.Sidebar",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events:
	{
		"onHomeTap": "",
		"onMentionsTap": "",
		"onFavoritesTap": "",
		"onStatusesTap": "",
		"onFollowersTap": "",
		"onFriendsTap": ""
	},
	components: 
	[{
        kind: "WebService", 
        method: "POST",
        name: "grabAccountVerifyCredentials", 
        onSuccess: "grabAccountVerifyCredentialsSuccess",
        onFailure: "grabAccountVerifyCredentialsFailure"
    },{
		kind: enyo.VFlexBox,
		className: "sidebar_header",
		components:
		[{
			kind: enyo.HFlexBox,
			align: "center",
			height: "50px",
			components:
			[{
				kind: enyo.Image,
				name: "profileImage"
			},{
				kind: enyo.HFlexBox,
				flex: 1,
				align: "center",
				components:
				[{
					flex: 1
				},{
					name: "name",
					className: "timeline_username"
				},{
					flex: 1
				}]
			}]
		}]
    },{
		kind: enyo.VFlexBox,
		name: "sidebarBody",
		className: "sidebar_body",
		flex: 1,
		components:
		[{
			kind: enyo.HFlexBox,
			className: "sidebar_counts_toolbar",
			components:
			[{
				kind: enyo.Item,
				layoutKind: enyo.VFlexLayout,
				name: "statusesCount",
				className: "sidebar_item",
				onclick: "onSidebarItemTap",
				align: "center",
				flex: 1,
				components:
				[{
    				name: "statusesCountNum" 
				},{
					content: "微博"
				}]
			},{
				kind: enyo.Item,
				layoutKind: enyo.VFlexLayout,
				name: "friendsCount",
				className: "sidebar_item",
				onclick: "onSidebarItemTap",
				align: "center",
				flex: 1,
				components:
				[{
					name: "friendsCountNum"
				},{
					content: "关注"
				}]
			},{
				kind: enyo.Item,
				layoutKind: enyo.VFlexLayout,
				name: "followersCount",
				className: "sidebar_item",
				onclick: "onSidebarItemTap",
				align: "center",
				flex: 1,
				components:
				[{
					name: "followersCountNum"
				},{
					content: "粉丝"
				}]
			}]
		},{
			kind: enyo.Item,
			name: "home",
			layoutKind: enyo.HFlexLayout,
			className: "sidebar_item",
			onclick: "onSidebarItemTap",
			components:
			[{
				content: "icon"
			},{
				content: "首页"
			}]
		},{
			kind: enyo.Item,
			name: "mentions",
			layoutKind: enyo.HFlexLayout,
			className: "sidebar_item",
			onclick: "onSidebarItemTap",
			components:
			[{
				content: "icon"
			},{
				content: "提到我的"
			}]
		},{
			kind: enyo.Item,
			layoutKind: enyo.HFlexLayout,
			className: "sidebar_item",
			onclick: "onSidebarItemTap",
			components:
			[{
				content: "icon"
			},{
				content: "转发"
			}]
		},{
			kind: enyo.Item,
			layoutKind: enyo.HFlexLayout,
			className: "sidebar_item",
			onclick: "onSidebarItemTap",
			components:
			[{
				content: "icon"
			},{
				content: "评论"
			}]
		},{
			kind: enyo.Item,
			name: "favorites",
			layoutKind: enyo.HFlexLayout,
			className: "sidebar_item",
			onclick: "onSidebarItemTap",
			components:
			[{
				content: "icon"
			},{
				content: "收藏"
			}]
		},{
			kind: enyo.Item,
			className: "sidebar_empty_last_item",
		}]
	},{
		kind: enyo.Toolbar,
		pack: "justify",
		components:
		[{
			
		}]
	}],
	ready: function()
	{
		this.updateUser(WeiboUtil.getFromStorage("user"));
	},
	updateUser: function(user)
	{
		if (user)
		{
			this.$.name.setContent(user.screen_name);
			this.$.statusesCountNum.setContent(user.statuses_count);
			this.$.followersCountNum.setContent(user.followers_count);
			this.$.friendsCountNum.setContent(user.friends_count);
			this.$.profileImage.setSrc(user.profile_image_url);
		}
	},
	redo: function()
	{
		var url = WeiboUtil.getAccountVerifyCredentialsURL();
    	this.$.grabAccountVerifyCredentials.setUrl(url.url);
        this.$.grabAccountVerifyCredentials.setHeaders(url.headers);
    	this.$.grabAccountVerifyCredentials.call();
	},
	onSidebarItemTap: function (inSender)
	{
		for (i in this.$.sidebarBody.controls)
		{
			if (i == 0)
			{
				for (j in this.$.sidebarBody.controls[i].controls)
				{
					this.$.sidebarBody.controls[i].controls[j].setState("down", false);
				}
			}
			else
			{
				this.$.sidebarBody.controls[i].setState("down", false);
			}
		}
		
		inSender.setState("down", true);
		
		if (inSender.name == "home")
		{
			this.doHomeTap();
		}
		else if (inSender.name == "mentions")
		{
			this.doMentionsTap();
		}
		else if (inSender.name == "favorites")
		{
			this.doFavoritesTap();
		}
		else if (inSender.name == "statusesCount")
		{
			this.doStatusesTap();
		}
		else if (inSender.name == "followersCount")
		{
			this.doFollowersTap();
		}
		else if (inSender.name == "friendsCount")
		{
			this.doFriendsTap();
		}
	},
    grabAccountVerifyCredentialsSuccess: function(inSender, inResponse, inRequest)
    {
    	this.updateUser(inResponse);
    	WeiboUtil.saveToStorage("user", inResponse);
    },
    grabAccountVerifyCredentialsFailure: function(inSender, inResponse, inRequest)
    {
    	
    }
});