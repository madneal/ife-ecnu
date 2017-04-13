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
			var result = parseToJson(str);
			yield write(resultfile, result);
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
		var arr = str.split('\r\n');
		var company = '';
		arr.forEach(function(lineData) {
			var lineDataArr = lineData.split(',');
			if (company !== lineDataArr[1]) {

				var result = [];
			}
			var object = result[lineDataArr[1]];
			for (var i = 0; i < lineDataArr.length; i++) {
				object[jsonKeyArr[i]] = lineDataArr[i];
			}
			result.push(object);
		});
		return JSON.stringify(result);
	})
}