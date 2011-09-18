enyo.kind({
	name: "WeiboTablet.Comments",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
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
			
			}]
			
		}]
	},{
		kind: enyo.Scroller,
		flex: 1,
		components:
		[{
		
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
	}]
});