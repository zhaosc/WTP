var WeiboUtil = (function(WeiboUtil) {
	function getAppKey() {
		return "61780054";
	};
	
	function getBaseURL() {
		return "http://api.t.sina.com.cn/";
	};
	
	WeiboUtil.get = function(token) {
		return getBaseURL() + token + "?source=" + getAppKey();
	};
	
	WeiboUtil.toShortDate = function(dateString) {
		var date = new Date(dateString);
		return (date.getMonth() + 1) + "ÔÂ" + date.getDate() + "ÈÕ " + 
			   date.getHours() + ":" + date.getMinutes();
	};
	
	return WeiboUtil;
}(WeiboUtil || {}));
