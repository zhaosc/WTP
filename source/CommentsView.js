enyo.kind({
	name: "WeiboTablet.CommentsView",
	kind: enyo.VFlexBox,
	components: 
	[{
		kind: enyo.Header,
		style: "min-height: 60px;",
		components:
		[{
			kind: enyo.HFlexBox,
			flex: 1,
			components:
			[{
				name: "summary",
				content: ""
			}]
			
		}]
	},{
		kind: enyo.Scroller,
		flex: 1,
		components:
		[{
		
		}]
	}],
	refresh: function(timeline)
	{
		this.$.summary.setContent(timeline.text);
	}
});