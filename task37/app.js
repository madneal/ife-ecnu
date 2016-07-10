var request = request('request');
var cheerio = request('cheerio');

var url = 'http://blog.csdn.net/neal1991?viewmode=contents';

request(url,function(err,res){
	if (err)
		return console.error(err);
	console.log(res);
})