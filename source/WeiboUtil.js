var WeiboUtil = (function (WeiboUtil) {

   var baseURL = "http://api.t.sina.com.cn/",
   	   appKey = "61780054",
   	   secret = "d443b764c8b523e6e6c6ad254f6e369f";

   WeiboUtil.get = function () {
	   var url = baseURL + arguments[0] + "?source=" + appKey;
	   
	   if (arguments.length > 1)
	   {
		   for( var i = 1; i < arguments.length; i++ ) {
			   url += "&" + arguments[i];
		   }
	   }

	   return url;
   };
   
   WeiboUtil.getFriendsTimelineURL = function() {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   //since_id = "",
	   //max_id = "",
	   count = 20,
	   page = 1,
	   base_app = 0,
	   feature = 0,
	   method = "GET",
	   action = "http://api.t.sina.com.cn/statuses/friends_timeline.json",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_signature_method: oauth_signature_method,
		   oauth_timestamp: oauth_timestamp,
		   oauth_token: this.getUserInfo().accessToken,
		   oauth_version: oauth_version
	   },
	   baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: action, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, tokenSecret: this.getUserInfo().accessTokenSecret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   return action +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + this.getUserInfo().accessToken + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature);
   };
   
   WeiboUtil.getMentionsURL = function() {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   //since_id = "",
	   //max_id = "",
	   count = 20,
	   page = 1,
	   method = "GET",
	   action = "http://api.t.sina.com.cn/statuses/mentions.json",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_signature_method: oauth_signature_method,
		   oauth_timestamp: oauth_timestamp,
		   oauth_token: this.getUserInfo().accessToken,
		   oauth_version: oauth_version
	   },
	   baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: action, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, tokenSecret: this.getUserInfo().accessTokenSecret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   return action +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + this.getUserInfo().accessToken + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature);
   };
   
   WeiboUtil.getFavoritesURL = function() {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   page = 1,
	   method = "GET",
	   action = "http://api.t.sina.com.cn/favorites.json",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_signature_method: oauth_signature_method,
		   oauth_timestamp: oauth_timestamp,
		   oauth_token: this.getUserInfo().accessToken,
		   oauth_version: oauth_version
	   },
	   baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: action, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, tokenSecret: this.getUserInfo().accessTokenSecret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   return action +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + this.getUserInfo().accessToken + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature);
   };
   
   WeiboUtil.getCountsURL = function(ids) {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   method = "GET",
	   action = "http://api.t.sina.com.cn/statuses/counts.json",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_token: this.getUserInfo().accessToken,
		   oauth_signature_method: oauth_signature_method,
		   oauth_timestamp: oauth_timestamp,
		   oauth_version: oauth_version,
		   ids: ids
	   },
	   baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: action, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, tokenSecret: this.getUserInfo().accessTokenSecret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   return action +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + this.getUserInfo().accessToken + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature) + 
	   "&ids=" + ids;
   };
   
   WeiboUtil.getCommentsURL = function(id) {
	   var oauth_consumer_key = appKey,
	   consumerSecret = secret,
	   oauth_signature_method = "HMAC-SHA1",
	   oauth_timestamp = OAuth.timestamp(),
	   oauth_nonce = OAuth.nonce(32),
	   oauth_version = "1.0",
	   method = "GET",
	   action = "http://api.t.sina.com.cn/statuses/comments.json",
	   parameters = 
	   {
		   oauth_consumer_key: oauth_consumer_key,
		   oauth_nonce: oauth_nonce,
		   oauth_token: this.getUserInfo().accessToken,
		   oauth_signature_method: oauth_signature_method,
		   oauth_timestamp: oauth_timestamp,
		   oauth_version: oauth_version,
		   id: id
	   },
	   baseString = OAuth.SignatureMethod.getBaseString({
		   method: method, 
		   action: action, 
		   parameters: parameters
	   }),
	   signer = OAuth.SignatureMethod.newMethod(
			   oauth_signature_method, 
			   {consumerSecret: consumerSecret, tokenSecret: this.getUserInfo().accessTokenSecret}
	   ),
	   oauth_signature = signer.getSignature(baseString);
	   
	   return action +
	   "?oauth_consumer_key=" + oauth_consumer_key + 
	   "&oauth_token=" + this.getUserInfo().accessToken + 
	   "&oauth_nonce=" + oauth_nonce + 
	   "&oauth_signature_method=" + oauth_signature_method + 
	   "&oauth_timestamp=" + oauth_timestamp +
	   "&oauth_version=" + oauth_version +
	   "&oauth_signature=" + encodeURIComponent(oauth_signature) + 
	   "&id=" + id;
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
	   return (date.getMonth() + 1) + "ÔÂ" + date.getDate() + "ÈÕ " + 
	   		  checkTime(date.getHours()) + ":" + checkTime(date.getMinutes());
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