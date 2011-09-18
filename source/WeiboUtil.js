var WeiboUtil = (function (WeiboUtil) {

   var baseURL = "http://api.t.sina.com.cn/";
   var appKey = "61780054";

   WeiboUtil.get = function (token) {
      return baseURL + token + "?source=" + appKey;
   };
   
   WeiboUtil.toShortDate = function (dateString) {
	   var date = new Date(dateString);
	   return (date.getMonth() + 1) + "ÔÂ" + date.getDate() + "ÈÕ " + 
	   		  date.getHours() + ":" + date.getMinutes();
   };
   
   return WeiboUtil;
}(WeiboUtil || {}));