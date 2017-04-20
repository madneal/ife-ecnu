var co = require('co');
var fs = require('fs');
var colors = require('colors');

var fileName = 'sp500hst.txt';
var resultfile = 'result.json';
var jsonKeyArr = ['date', 'ticker', 'open', 'high', 'low', 'close', 'volume'];

parseCsv(fileName);

function parseCsv(fileName) {
	return co(function*() {
		try{
			console.log(fileName);
			var str = yield read(fileName);	
			var result = yield parseToJson(str);
			// yield write('result.json', JSON.stringify(result));
			// console.log('final result ' + JSON.stringify(result));
			for (var key in result) {
				console.log(key);
				yield write(__dirname + '/jsondata/' + key + '.json', JSON.stringify(result[key]));
			}
		} catch(err) {
			console.log(colors.red(err));
		}
	})
}

function read(file) {
	return function(fn) {
		fs.readFile(file, 'utf8', fn);
	}
}

function write(file, content) {
	return function(fn) {
		fs.writeFile(file, content, fn);
	}
}

function parseToJson(str) {
	return co(function*() {
		try {
			var arr = str.split('\r\n');
			var company = '';
			var result = [];
			console.log(colors.blue(arr[0]));
			arr.forEach(function(lineData) {
				var lineDataArr = lineData.split(',');
				var object = {};
				for (var i = 0; i < lineDataArr.length; i++) {
					object[jsonKeyArr[i]] = lineDataArr[i];
				}
				result.push(object);
			});
			var jsonData = {};
			var key = '';
			result.forEach(function(ele) {
				if (key != ele.ticker) {
					key = ele.ticker;
					jsonData[key] = [];
				}
				jsonData[key].push(ele);
			})
			console.log('the typer of JsonData:' + typeof(jsonData));
			return jsonData;
		} catch(e) {
			console.log(colors.red(e));
		}

	})
}