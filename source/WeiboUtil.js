var WeiboUtil = (function (WeiboUtil) {

   var baseURL = "http://api.t.sina.com.cn/";
   var appKey = "61780054";

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
   
   function checkTime(i)
   {
	   if (i<10) 
	   {
		   i="0" + i;
	   }
	   return i;
   }
   
   return WeiboUtil;
}(WeiboUtil || {}));