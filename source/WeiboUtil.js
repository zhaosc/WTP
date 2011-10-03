var WeiboUtil = (function (WeiboUtil) {

   var baseURL = "http://api.t.sina.com.cn/",
   	   appKey = "61780054",
   	   secret = "d443b764c8b523e6e6c6ad254f6e369f";
   
   WeiboUtil.getUserShowURL = function(screen_name) {
	   return getURL("http://api.t.sina.com.cn/users/show.json",
			   {screen_name: screen_name});
   };
   
   WeiboUtil.getFriendsTimelineURL = function() {
	   return getURL("http://api.t.sina.com.cn/statuses/friends_timeline.json");
   };
   
   WeiboUtil.getMentionsURL = function() {
	   return getURL("http://api.t.sina.com.cn/statuses/mentions.json");
   };
   
   WeiboUtil.getFavoritesURL = function() {
	   return getURL("http://api.t.sina.com.cn/favorites.json");
   };
   
   WeiboUtil.getCountsURL = function(ids) {
	   return getURL("http://api.t.sina.com.cn/statuses/counts.json",
			   {ids: ids});
   };
   
   WeiboUtil.getCommentsURL = function(id) {
	   return getURL("http://api.t.sina.com.cn/statuses/comments.json",
		         {id: id});
   };
   
   WeiboUtil.getRepostTimelineURL = function(id) 
   {
	   return getURL("http://api.t.sina.com.cn/statuses/repost_timeline.json",
			   {id: id});
   };
   
   WeiboUtil.getRequestTokenURL = function() {
	   var oauth_consumer_key = appKey,
		   consumerSecret = secret,
		   oauth_signature_method = "HMAC-SHA1",
		   oauth_timestamp = OAuth.timestamp(),
		   oauth_nonce = OAuth.nonce(32),
		   oauth_version = "1.0",
		   method = "GET",
		   action = "http://api.t.sina.com.cn/oauth/request_token",
		   parameters = 
		   {
			   oauth_consumer_key: oauth_consumer_key,
			   oauth_nonce: oauth_nonce,
			   oauth_signature_method: oauth_signature_method,
			   oauth_timestamp: oauth_timestamp,
			   oauth_version: oauth_version
		   },
		   baseString = OAuth.SignatureMethod.getBaseString({
			   method: method, 
			   action: action, 
			   parameters: parameters
		   }),
		   signer = OAuth.SignatureMethod.newMethod(
				   oauth_signature_method, 
				   {consumerSecret: consumerSecret, tokenSecret: null}
		   ),
		   oauth_signature = signer.getSignature(baseString);
	
	   return action +
		   "?oauth_consumer_key=" + oauth_consumer_key + 
		   "&oauth_nonce=" + oauth_nonce + 
		   "&oauth_signature_method=" + oauth_signature_method + 
		   "&oauth_timestamp=" + oauth_timestamp +
		   "&oauth_version=" + oauth_version +
		   "&oauth_signature=" + encodeURIComponent(oauth_signature);
   };
   
   WeiboUtil.getAccessTokenURL = function(oauth_token, oauth_verifier, oauth_token_secret) {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   method = "GET",
	   action = "http://api.t.sina.com.cn/oauth/access_token",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_timestamp: oauth_timestamp,
		   oauth_token: oauth_token,
		   oauth_signature_method: oauth_signature_method,
		   oauth_verifier: oauth_verifier,
		   oauth_version: oauth_version
	   },
	   baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: action, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, tokenSecret: oauth_token_secret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   return action +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + oauth_token + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_verifier=" + oauth_verifier +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature);
   };
   
   WeiboUtil.getAuthorizeURL = function(oauthToken, userId, passwd) {
	   return "http://api.t.sina.com.cn/oauth/authorize?oauth_token=" + 
	   oauthToken + "&oauth_callback=json&userId=" + userId + 
	   "&passwd=" + passwd;
   };
   
   WeiboUtil.getSource = function (source) {
	   var from = source.indexOf(">") + 1;
       var to = source.lastIndexOf("</a>");
       
       return source.substring(from, to);
   };
   
   WeiboUtil.toShortDate = function (dateString) {
	   var date = new Date(dateString);
	   return (date.getMonth() + 1) + "月" + date.getDate() + "日 " + 
	   		  checkTime(date.getHours()) + ":" + checkTime(date.getMinutes());
   };
   
   WeiboUtil.textToHtml = function (text) {
	   var match = [].concat(text.match(/@[\u4e00-\u9fa5\w\-]+/g),
			   text.match(/#[^#|.]+#/g), text.match(/http:\/\/t.cn\/[\w]{5,6}/gi));	

	   for (i in match)
	   {
		   var regex = new RegExp(match[i] + "(?!([<\"]))");
		   text = text.replace(regex, "<a href=\"" + match[i] + "\">" + 
				   match[i] + "</a>");
	   }
	   
	   return text;
   };
   
   var userInfo = [];
   
   WeiboUtil.getUserInfo = function() {
	   if (userInfo.length == 0)
	   {
		   userInfo = localStorage.getItem("userInfo");
		   
		   if (userInfo == undefined)
		   {
			   userInfo = [];
		   }
		   else
		   {
			   userInfo = JSON.parse(userInfo)[0];
		   }
	   }
	   
	   return userInfo;
   };
   
   WeiboUtil.setUserInfo = function(userId, accessToken, accessTokenSecret) {
	   var userInfoString = "[{\"userId\":\"" + userId + "\",\"accessToken\":\"" + 
	   accessToken + "\",\"accessTokenSecret\":\"" +
	   accessTokenSecret + "\"}]";
	   
	   localStorage.setItem("userInfo", userInfoString);
	   
	   userInfo = JSON.parse(userInfoString)[0];
   };
   

   function getURL(a, p) 
   {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   method = "POST",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_token: WeiboUtil.getUserInfo().accessToken,
		   oauth_signature_method: oauth_signature_method,
		   oauth_timestamp: oauth_timestamp,
		   oauth_version: oauth_version,
	   };
	   
	   if (p)
	   {
		   for (var k in p) 
		   {
			   if (p.hasOwnProperty(k)) 
			   { 
				   parameters[k] = p[k];
			   }
		   }
	   }
	   
	   var baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: a, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, 
			    tokenSecret: WeiboUtil.getUserInfo().accessTokenSecret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   parameters["oauth_signature"] = oauth_signature;
	   
	   var url = a +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + WeiboUtil.getUserInfo().accessToken + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature);
	   
	   if (p)
	   {
		   for (var k in p) 
		   {
			   if (p.hasOwnProperty(k)) 
			   { 
				   url += "&" + k + "=" + p[k];
			   }
		   }
	   }
	   
	   return {url: url, headers: parameters};
   };
   
   function checkTime(i)
   {
	   if (i < 10) 
	   {
		   i="0" + i;
	   }
	   return i;
   }
   
   return WeiboUtil;
}(WeiboUtil || {}));