var FloatLayer = function(element){
	this.ele = element;
	this.visible = false;
	this.maskEle = null;
	this.animateTime = 600;

	this.init();
}

FloatLayer.prototype = {
	show: function(){
		this.visible = true;
		this.ele.style.transform = 'translate(-50%,-50%) scale(1,1)';
		this.maskEle.style.visiblity = 'visible';
		this.ele.style.lfet = '50%';
		this.ele.style.top = '50%';
	},

	hide: function(){
		this.visible = false;
		this.ele.style.transform = 'translate(-50%,-50%) scale(0,0)';
		var self = this;
		setTimeout(function(){
			self.maskEle.style.visiblity = 'hidden';
		},this.animateTime-10)
	},

	
}