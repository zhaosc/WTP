enyo.kind
({
	name: "WeiboTablet.Splash",
	kind: enyo.VFlexBox,
	pack: "center",
	align: "center",
    components: 
	[{
		flex: 1
	},{
		className: "splash_title",
    	content: "新浪微博"
	},{
		kind: enyo.HFlexBox,
		className: "splash_spinner",
		flex: 1,
		components: 
		[{
			name: "splashSpinner",
			kind: enyo.Spinner,
			showing: false
		},{
			name: "splashText",
			content: "获取信息...",
			showing: false
		}]
	}],
    showSpinner: function()
    {
    	this.$.splashSpinner.show();
    	this.$.splashText.show();
    },
    hideSpinner: function()
    {
    	this.$.splashSpinner.hide();
    	this.$.splashText.hide();
    }
});