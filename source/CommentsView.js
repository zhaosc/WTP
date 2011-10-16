enyo.kind({
	name: "WeiboTablet.CommentsView",
	kind: enyo.VFlexBox,
	className: "comments_header",
	components:
	[{
        kind: "WebService", 
        method: "POST",
        name: "grabComments", 
        onSuccess: "grabCommentsSuccess",
        onFailure: "grabCommentsFailure"
    },{
        kind: "WebService", 
        method: "POST",
        name: "grabRepostTimeline", 
        onSuccess: "grabRepostTimelineSuccess",
        onFailure: "grabRepostTimelineFailure"
    },{
		kind: enyo.HFlexBox,
		components:
		[{
			kind: enyo.Image, 
            name: "authorProfileImage",
            className: "comments_avatar"
		},{
			kind: enyo.VFlexbBox,
			flex: 1,
			components:
			[{
				name: "author",
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
			onclick: "commentsButtonTapped",
			flex: 1
		},{
			content: "转发",
			name: "rtButton",
			className: "comments_button",
			onclick: "rtButtonTapped",
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
		kind: enyo.VirtualList,
		flex: 1,
		name: "contents",
        onSetupRow: "setupContent",
        components:
        [{
            kind: enyo.Item,
            layoutKind: enyo.HFlexLayout,
            className: "comment",
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
					className: "comments_username"
				},{
					name: "content",
					style: "padding-right: 12px;",
					content: ""
				}]
			}]
        }]
	}],
	redo: function(timeline, counts)
	{
		if (!this.timeline || this.timeline.id != timeline.id)
		{
			this.timeline = timeline;
			this.counts = counts;
			this.comments = undefined;
			this.rt = undefined;
			this.$.authorProfileImage.setSrc(timeline.user.profile_image_url);
			this.$.author.setContent(timeline.user.name);
			
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
			    
				this.$.grabComments.setUrl(url.url);
		        this.$.grabComments.setHeaders(url.headers);
			    this.$.grabComments.call();
			    
				this.$.commentsButton.setContent("评论(" + counts.comments + ")");
			}
			
			this.contentType = "comments";
			this.$.commentsButton.addClass("comments_button_selected");
			this.$.rtButton.removeClass("comments_button_selected");
			
			if (counts.rt > 0)
			{
				this.$.rtButton.setContent("转发(" + counts.rt + ")");
			}
		}
	},
	grabCommentsSuccess: function(inSender, inResponse, inRequest)
	{
		this.comments = inResponse;
		this.$.contents.punt();
	},
	grabCommentsFailure: function()
	{
		
	},
	grabRepostTimelineSuccess: function(inSender, inResponse, inRequest)
	{
		this.rt = inResponse;
		this.$.contents.punt();
	},
	grabRepostTimelineFailure: function()
	{
		
	},
	setupContent: function(inSender, inIndex)
	{
		if (this.contentType)
		{
			var content;
			if (this.contentType == "comments" && this.comments && inIndex < this.comments.length)
			{
				content = this.comments[inIndex];
			}
			else if (this.contentType == "rt" && this.rt && inIndex < this.rt.length)
			{
				content = this.rt[inIndex];
			}
			else
			{
				return false;
			}
			
			if (content)
			{
				this.$.content.setContent(content.text);
				this.$.username.setContent(content.user.name);
				this.$.profileImage.setSrc(content.user.profile_image_url);
				
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	},
	commentsButtonTapped: function()
	{
		this.contentType = "comments";
		this.$.commentsButton.addClass("comments_button_selected");
		this.$.rtButton.removeClass("comments_button_selected");
		this.$.contents.punt();
	},
	rtButtonTapped: function()
	{
		this.contentType = "rt";
		this.$.rtButton.addClass("comments_button_selected");
		this.$.commentsButton.removeClass("comments_button_selected");
		
		if(this.counts.rt > 0)
		{
			if (this.rt)
			{
				this.$.contents.punt();
			}
			else
			{
				var url = WeiboUtil.getRepostTimelineURL(this.timeline.id);
			    
				this.$.grabRepostTimeline.setUrl(url.url);
		        this.$.grabRepostTimeline.setHeaders(url.headers);
			    this.$.grabRepostTimeline.call();
			}
		}
	}
});