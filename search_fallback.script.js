window.onload = function () {
  function parseURL(url) {     //解析url
    var a = document.createElement('a');
    a.href = url;
    return {
      source: url,
      host: a.hostname,
      query: a.search,
    };
  }

  function objParams(array) {   //数组转对象
    var ret = {};
    var s = [];
    for (i = 0; i < array.length; i++) {
      if (!array[i]) {
        continue;
      }
      s = array[i].split('=');
      ret[s[0]] = s[1];
    }
    return ret;
  }

  function goback(url) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {   //监听浏览器后退
      history.pushState(null, null, document.URL);
      window.location.href = url;
    });
  }

  if (!document.referrer === '') {
    var pastUrl = parseURL(document.referrer);
    var arrParams = pastUrl.query.replace(/^\?/, '').split('&');    //提取参数
    var gobackUrl = '';
    switch (pastUrl.host) {
      case 'm.baidu.com':
        var word = objParams(arrParams).word;   //获得搜索关键字
        if (!word) {word = ''};
        gobackUrl = 'https://m.baidu.com/from=1015241i/s?word=' + word;   //生成对应url
        break;
      case 'm.sm.cn':
        var q = objParams(arrParams).q;   
        if (!q) {q = ''};
        gobackUrl = 'https://m.sm.cn/s?q=' + q + '&from=wm747981';
        break;
      default:
        break;
    }
    goback(gobackUrl);
  } else {}
}