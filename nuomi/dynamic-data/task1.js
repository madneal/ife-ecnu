function Observer(data) {
	this.data = data;
	this.walk(data);
}

let p = Observer.prototype;

p.walk = function(obj) {
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
	Object.defineProperty(this.data, key, {
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

let data = {
	person: {
		name: 'neal',
		age: 16,
		sex: 'male'
	},
	address: {
		city: 'shanghai'
	}
};

let app = new Observer(data);