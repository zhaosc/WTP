enyo.kind({
	name: "WeiboTablet.TimelineView",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: 
	[{
		kind: enyo.Header,
		style: "min-height: 60px;",
		layoutKind: enyo.HFlexLayout,
		components:
		[{
			kind: enyo.InputBox,
			flex: 1,
			style: "height: 60px;",
			alwaysLooksFocused: true,
			components: 
			[{
				kind: enyo.BasicRichText,
				flex: 1, 
				className: "enyo-input-inner"
			}]
		}]
	},{
		kind: enyo.Scroller,
		name: "timeline",
		flex: 1,
		components:
		[{
			kind: enyo.VirtualRepeater,
			onSetupRow: "getTimeline",
			className: "timeline",
			components:
			[{
				kind: enyo.Item,
				layoutKind: enyo.HFlexLayout,
				tapHighlight: true,
				components:
				[{
					kind: enyo.Image, 
					name: "profileImage",
					className: "avatar"
				},{
					kind: enyo.VFlexBox, 
					pack: "center", 
					flex: 1, 
					components: 
					[{
						name: "username",
						className: "timeline_username", 
						content: ""
					},{
						name: "text",
						content: ""
					},{
						kind: enyo.VFlexBox,
						components:
						[{
							name: "retweetedUsername",
							content: ""
						},{
							name: "retweetedText",
							content: ""
						},{
							kind: enyo.HFlexBox,
							components:
							[{
								name: "retweetedCreatedAt",
								content: ""
							},{
								name: "retweetedSource",
								content: ""
							}]
						}]
					},{
						kind: enyo.HFlexBox,
						components:
						[{
							name: "createdAt",
							content: ""
						},{
							name: "source",
							content: ""
						}]
					}]
				}]
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
	getTimeline: function(inSender, inIndex)
	{
		var r = this.owner.timeline[inIndex];
		
		if (r) 
		{
			this.$.text.setContent(r.text);
			this.$.username.setContent(r.user.name);
			this.$.profileImage.setSrc(r.user.profile_image_url);
			this.$.createdAt.setContent(WeiboUtil.toShortDate(r.created_at));
			this.$.source.setContent(r.source);
			
			if (r.retweeted_status)
			{
				this.$.retweetedText.setContent(r.retweeted_status.text);
				this.$.retweetedUsername.setContent(r.retweeted_status.user.name);
				this.$.retweetedCreatedAt.setContent(WeiboUtil.toShortDate(r.retweeted_status.created_at));
				this.$.retweetedSource.setContent(r.retweeted_status.source);
			}
			
			return true;
		}
	},
});