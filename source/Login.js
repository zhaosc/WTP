enyo.kind
({
	name: "WeiboTablet.Login",
	kind: enyo.VFlexBox,
    events: 
    {
    	onLoggedIn: ""
    },
    components: 
    [{
        kind: "WebService", 
        name: "request", 
        onSuccess: "requestSuccess",
        onFailure: "requestFailure"
    },{
        kind: "WebService", 
        name: "authorize", 
        onSuccess: "authorizeSuccess",
        onFailure: "authorizeFailure"
    },{
        kind: "WebService", 
        name: "access", 
        onSuccess: "accessSuccess",
        onFailure: "accessFailure"
    },{
		name: "failureText",
		content: "µÇÂ½Ê§°Ü"
    },{
    	kind: enyo.HFlexBox,
    	components:
		[{
    		content: "ÓÃ»§Ãû"
		},{
			name: "userId",
			kind: enyo.Input
		}]
    },{
    	kind: enyo.HFlexBox,
    	components:
		[{
    		content: "ÃÜÂë"
		},{
			name: "passwd",
			kind: enyo.PasswordInput
		}]
    },{
    	kind: "HFlexBox", 
		components: 
		[{
			name: "loginButton", 
			kind: enyo.Button,
			content: "µÇÂ½", 
			onclick: "loginClick"
		},{
			width: "10px"
		},{
			name: "cancelButton", 
			kind: enyo.Button,
			content: "È¡Ïû", 
			onclick: "cancelClick"
		}]
	}],
	loginClick: function()
	{
		var url = WeiboUtil.getRequestTokenURL();
		this.$.request.setUrl(url);
        this.$.request.call();
		// this.doLoggedIn();
	},
	requestSuccess: function(inSender, inResponse, inRequest)
    {
    	this.$.failureText.setContent(inResponse);
    	oauthToken = inResponse.split("&")[0].split("=")[1];
    	this.oauthTokenSecret = inResponse.split("&")[1].split("=")[1];
    	
    	var url = WeiboUtil.getAuthorizeURL(oauthToken, this.$.userId.value, this.$.passwd.value);
    	this.$.authorize.setUrl(url);
        this.$.authorize.call();
    },
    requestFailure: function()
    {
    	this.$.failureText.setContent("Request failed");
    },
    authorizeSuccess: function(inSender, inResponse, inRequest)
    {
    	var oauth_token = inResponse.oauth_token,
    		oauth_verifier = inResponse.oauth_verifier;
    	this.$.failureText.setContent(oauth_token + "|" + oauth_verifier);
    	var url = WeiboUtil.getAccessTokenURL(oauth_token, oauth_verifier, this.oauthTokenSecret);
    	this.$.access.setUrl(url);
        this.$.access.call();
    },
    authorizeFailure: function()
    {
    	this.$.failureText.setContent("Authorize failed");
    },
    accessSuccess: function(inSender, inResponse, inRequest)
    {
    	var userId = inResponse.split("&")[2].split("=")[1],
    	accessToken = inResponse.split("&")[0].split("=")[1],
    	accessTokenSecret = inResponse.split("&")[1].split("=")[1];
    	
    	this.$.failureText.setContent(userId + "|" +
    			accessToken + "|" + accessTokenSecret);
    	
    	WeiboUtil.setUserInfo(userId, accessToken, accessTokenSecret);
    	
    	this.doLoggedIn();
    },
    accessFailure: function()
    {
    	this.$.failureText.setContent("Access failed");
    }
});