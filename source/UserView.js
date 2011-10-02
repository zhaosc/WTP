enyo.kind({
    name: "WeiboTablet.UserView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    components: 
    [{
        kind: "WebService", 
        method: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        name: "grabUserShow", 
        onSuccess: "grabUserShowSuccess",
        onFailure: "grabUserShowFailure"
    },{
    	flex: 1,
        name: "username", 
        content: ""
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
    refresh: function(username)
    {
    	username = decodeURIComponent(username);
    	this.$.username.setContent(username);
    	var url = WeiboUtil.getUserShowURL(username);
    	this.$.grabUserShow.setUrl(url.url);
        this.$.grabUserShow.setHeaders(url.headers);
    	this.$.grabUserShow.call();
    },
    grabUserShowSuccess: function(inSender, inResponse, inRequest)
    {
    	this.$.username.setContent(inResponse);
    },
    grabUserShowFailure: function(inSender, inResponse, inRequest)
    {
    	
    }
});