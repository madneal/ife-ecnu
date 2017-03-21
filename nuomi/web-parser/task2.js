/**
 * Created by neal1 on 2017/3/6.
 */
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
phantom.outputEncoding="gb2312";

var ip5 = {
    width: 320,
    height: 568,
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

var ip6 = {
    width: 375,
    height: 667,
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

var ipad = {
    width: 768,
    height: 1024,
    ua: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};


// in order to display the console info
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open('http://www.baidu.com', function(status) {
    var searchWord = '12306';
    var beginTime = Date.now();
    page.evaluate(function() {
        document.querySelector('#kw').value = '12306';
        console.log(document.querySelector('#kw').value);
        document.querySelector('#su').click();
        console.log(document.title);
        return document.title;
    })
    setTimeout(function() {
        page.evaluate(function(beginTime) {
        var result = {};
        console.log(document.title);
        console.log('the status is ' + status);
        result.code = 1;
        result.msg = '抓取成功';
        var endTime = Date.now();
        console.log('the begin time is: ' + beginTime);
        console.log('the end time is: ' + endTime);
        var loadTime = endTime - beginTime;
        result.time = loadTime;
        result.dataList = [];
        console.log('the document title ' + document.title);
        var dataListDoms = document.querySelectorAll('#content_left .result-op');
        console.log('the length of dataListDoms is ' + dataListDoms.length);
        if (!dataListDoms) {
            console.log('the dataListDoms is empty');
        } else {            
            console.dir(dataListDoms);
        }
        for (var i = 0; i < dataListDoms.length; i++) {
            var ele = {};
            var dom = dataListDoms[i];
            var title = dom.querySelector('h3 a');
            var pic = dom.querySelector('img');
            var info = dom.querySelector('.c-span21');
            if (title) {
                ele.title = title.textContent;
                ele.link = title.href;
                console.log('ele title ' + ele.title);
                console.log('ele link ' + ele.link);
            }
            if (pic) {
                ele.pic = pic.src;
            }
            if (info) {
                ele.info = info.childNodes[1].textContent;
                console.log('ele info ' + ele.info);
            }
            result.dataList.push(ele);
        }
        console.log(JSON.stringify(result));
        })
    }, 10000)
    setTimeout(function() {
        phantom.exit();
    }, 20000)
  // phantom.exit();
});



