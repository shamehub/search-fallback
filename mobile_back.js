//var href='http://m.baidu.com/from=1013672a/bd_page_type=1/ssid=0/uid=0/pu=usm%405%2Csz%401321_1001%2Cta%40utouch_2_2.2_3_533/baiduid=A26F07F787678E7AF22A109EB6C08DCE/w=0_10_%E5%B0%8F%E7%B1%B3Note2/t=wap/l=1/tc?ref=www_utouch&lid=11901932556477610718&order=1&fm=alrt&waplogo=1&tj=realtime_1_0_10_l1&sec=14361&di=c93d1b1bae664e52&bdenc=1&nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IGtiJMCtQBTuw95qshbrgHhEsRD0hRH_ZH5CwdoTQsR9HrXSjAmUmzBAxrq6jsWwd973av0iprq';
//var href2='http://m.baidu.com/from=844b/s?word=%E7%BE%8E%E5%A5%B3&sa=ib&ts=6851638&rsv_pq=7008547447924191126&rsv_t=b4a0zCUkOL8zjGnGkcXakR8jVdBJ2V1UE9g41hLfTyaEJuTkWE1d78Oqiw&ms=1';
(function(d,w){
var arr=['m.baidu.com/from=','/bd_page_type=','/w=','/t='];
var arr2=['m.baidu.com/from=','/s?','word=','&'];

//判断数组内字符串是否依次存在，返回一个数组，其数据依次为字符串索引
function isKeysExist(url,arr){
	if(!arr||arr.length<1) return null;

	var obj=[];
	var start=0;
	for(var i=0;i<arr.length;i++){
		obj[i]=url.indexOf(arr[i],start);
		if(obj[i]<0) return null;
		start=obj[i]+arr[i].length;

		if(i>0&&obj[i]<=obj[i-1]) return null;
	}
	return obj;
}

function goback(wd){
	var ua=navigator.userAgent;
	if(ua.match(/applewebkit/i)){
		var dest='https://m.baidu.com/from=1012704v/s?word='+wd+"&sa=ib";
		var h = d.createElement('a');
		h.rel='noreferrer';
		h.href=dest;
		d.body.appendChild(h);
		var evt=d.createEvent('MouseEvents');
		evt.initEvent('click', true,true);
		h.dispatchEvent(evt);
	}
}

function getKeyword(url){
	var indexArr=isKeysExist(url,arr);
	if(indexArr){
		if(indexArr[3]>(indexArr[2]+8)){
			var content=url.substring(indexArr[2]+3,indexArr[3]);
			if(content.length>5&&content.indexOf('/')<0&&content.indexOf('=')<0){
				var kArr = content.split('_');
				if (kArr.length==3)
				{
					goback(kArr[2]);
				}
			}
		}
	}
}

function getKeyword2(url){
	var indexArr=isKeysExist(url,arr2);
	if(indexArr){
		if(indexArr[3]>(indexArr[2]+5)){
			var key=url.substring(indexArr[2]+5,indexArr[3]);
			if(key.length>0&&key.indexOf('/')<0&&key.indexOf('=')<0){
				goback(key);
			}
		}
	}
}

setTimeout(function(){
	var href = d.referrer;
	var iarr=isKeysExist(href,arr);
	if(iarr){//来自m百度
		if (location.hash.indexOf("_motz_") == -1){
			var url = location.href;
			history.pushState({page: 1},"", url+ "#_motz_");
			w.onpopstate = function(a){
				if (location.hash.indexOf("_motz_") == -1){
					getKeyword(href);
				}
			}
		}
	}else{
		var iarr2=isKeysExist(href,arr2);
		if(iarr2){
			if (location.hash.indexOf("_motz_") == -1){
				var url = location.href;
				history.pushState({page: 1},"", url+ "#_motz_");
				w.onpopstate = function(a){
					if (location.hash.indexOf("_motz_") == -1){
						getKeyword2(href);
					}
				}
			}
		}
	}
},1000);
})(document,window)