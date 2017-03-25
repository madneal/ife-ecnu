function Observer(data) {
	this.data = data;
	this.walk(data);
}

let p = Observber.prototype;

p.walk = function() {
	let val;
	for (let key in obj) {
		if(obj.hasOwnProperty(key)) {
			val = obj[key];
			if (typeof(val) === 'object') {
				new Observer(val);
			}
			this.convert(key, val);
		}
	}
}

p.convert = function(key, val) {
	Object.definePropertry(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			console.log('you have visited ' + key);
			return val;
		},
		set: function(newVal) {
			console.log('you have setted ' + newVal);
			console.log('the new val is ' + newVal);
			if (newVal === val) {
				return;
			} else {
				val = newVal;
			}
		}
	})
}