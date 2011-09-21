enyo.kind({
	name: "WeiboTablet.Sidebar",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: 
	[{
		kind: enyo.Header,
		className: "sidebar_header",
		components:
		[{
			content: "Weibo"
		}]
	},{
		kind: enyo.VFlexBox,
		name: "sidebarBody",
		className: "sidebar_body",
		flex: 1,
		components:
		[{
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
				content: "评论"
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
				content: "私信"
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
	onSidebarItemTap: function (inSender)
	{
		for (i in this.$.sidebarBody.controls)
		{
			this.$.sidebarBody.controls[i].setState("down", false);
		}
		
		inSender.setState("down", true);
	}
});