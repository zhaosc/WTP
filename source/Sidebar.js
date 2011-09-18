enyo.kind({
	name: "Weibo.Sidebar",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: 
	[{
		kind: enyo.Header,
		style: "min-height: 60px;",
		components:
		[{
			content: "Weibo"
		}]
	},
	{
		kind: enyo.Scroller,
		flex: 1,
		components:
		[{
			kind: enyo.VirtualRepeater,
			components:
			[{
				kind: enyo.Item,
				components:
				[{
					
				}]
			}]
		}]
	},
	{
		kind: enyo.Toolbar,
		pack: "justify",
		components:
		[{
			
		}]
	}]
});