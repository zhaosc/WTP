enyo.kind({
	name: "WeiboTablet.UserListView",
	kind: enyo.VFlexBox,
	flex: 1,
	components:
	[{
        kind: "WebService", 
        method: "POST",
        name: "grabUserList", 
        onSuccess: "grabUserListSuccess",
        onFailure: "grabUserListFailure"
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
						name: "genderAndLocation"
					},{
						name: "counts"
					}]
				}]
	        }]
		}]
	}],
	refresh: function(url)
	{
		this.$.grabUserList.setUrl(url.url);
		this.$.grabUserList.setHeaders(url.headers);
		this.$.grabUserList.call();
	},
	setupContent: function(inSender, inIndex)
	{
		if (this.ids && inIndex < 25) // Limit
		{
			this.$.username.setContent(this.ids.ids[inIndex]+"");
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
		this.$.userList.render();
	},
	grabUserListFailure: function()
	{
		
	}
});