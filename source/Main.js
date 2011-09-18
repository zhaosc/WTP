enyo.kind
({
	name: "Weibo.Main",
	kind: enyo.VFlexBox,
	components: 
	[{
		kind: "SlidingPane",
		flex: 1,
		multiViewMinWidth: 480,
		name: "mainSlidingPane",
		components:
		[{
			name: "sidebarPane",
			width: "320px",
			kind: "Weibo.Sidebar"
		},{
			name: "itemsPane",
			flex: 1,
			kind: "Weibo.Items"
		}]
	}]
});