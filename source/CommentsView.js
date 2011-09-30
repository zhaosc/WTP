enyo.kind({
	name: "WeiboTablet.CommentsView",
	kind: enyo.VFlexBox,
	className: "comments_header",
	components:
	[{
        kind: "WebService", 
        name: "grabComments", 
        onSuccess: "grabCommentsSuccess",
        onFailure: "grabCommentsFailure"
    },{
		kind: enyo.HFlexBox,
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
				name: "username",
				style: "padding-right: 12px;",
				className: "comments_username"
			},{
				name: "summary",
				style: "padding-right: 12px;",
				content: ""
			}]
		}]
		
	},{
		kind: enyo.HFlexBox,
		className: "comments_button_toolbar",
		components:
		[{
			content: "评论",
			name: "commentsButton",
			className: "comments_button",
			flex: 1
		},{
			content: "转发",
			name: "rtButton",
			className: "comments_button",
			flex: 1
		}]
	},{
		kind: enyo.VFlexBox,
		className: "input_toolbar",
		components:
		[{
			kind: enyo.Input,
	        name: "commentsInput",
	        hint: "",
	        alwaysLooksFocused: true,
	        inputClassName: "new_timeline_input_inner",
	        className: "new_timeline_input",
	        styled: false
		}]
	},{
		kind: enyo.Scroller,
		flex: 1,
		name: "comments",
		components:
		[{
			kind: enyo.VirtualRepeater,
            onSetupRow: "getComment",
            components:
            [{
                kind: enyo.Item,
                layoutKind: enyo.HFlexLayout,
                className: "comment",
				components:
				[{
					kind: enyo.Image, 
		            name: "commenterProfileImage",
		            className: "comments_avatar"
				},{
					kind: enyo.VFlexbBox,
					flex: 1,
					components:
					[{
						name: "commenterUsername",
						className: "comments_username"
					},{
						name: "comment",
						style: "padding-right: 12px;",
						content: ""
					}]
				}]
            }]
		}]
	}],
	refresh: function(timeline, counts)
	{
		this.$.profileImage.setSrc(timeline.user.profile_image_url);
		this.$.username.setContent(timeline.user.name);
		
		if(timeline.text.length < 45)
		{
			this.$.summary.setContent(timeline.text);
		}
		else
		{
			this.$.summary.setContent(timeline.text.substring(0, 45) + "...");
		}
		
		if(counts.comments > 0)
		{
			var url = WeiboUtil.getCommentsURL(timeline.id);
		    
		    this.$.grabComments.setUrl(url);
		    this.$.grabComments.call();
		    
			this.$.commentsButton.setContent("评论(" + counts.comments + ")");
		}
		
		this.$.commentsButton.addClass("comments_button_selected");
		
		if (counts.rt > 0)
		{
			this.$.rtButton.setContent("转发(" + counts.rt + ")");
		}
	},
	grabCommentsSuccess: function(inSender, inResponse, inRequest)
	{
		this.comments = inResponse;
		this.$.comments.render();
	},
	grabCommentsFailure: function()
	{
		
	},
	getComment: function(inSender, inIndex)
	{
		if (this.comments && inIndex < this.comments.length)
		{
			this.$.comment.setContent(this.comments[inIndex].text);
			this.$.commenterUsername.setContent(this.comments[inIndex].user.name);
			this.$.commenterProfileImage.setSrc(this.comments[inIndex].user.profile_image_url);
			
			return true;
		}
		else
		{
			return false;
		}
	}
});