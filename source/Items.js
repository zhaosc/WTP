enyo.kind({
	name: "Weibo.Items",
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
		flex: 1,
		components:
		[{
			kind: enyo.VirtualRepeater,
			components:
			[{
				kind: enyo.Item,
				layout: enyo.HFlexBox,
				tapHighlight: true,
				components:
				[{
					
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
	}]
});