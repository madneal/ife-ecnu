//simplify the selector
function $(ele){
	return document.querySelector(ele);
}

var queue = [];
var snapshots = [];
var timer = null;
var colors = ["#441d49","#538289","#a02730","#73832a","#005db1","#10193a"];
var interval = 10;
$(".chart").addEventListener("click",function(e){
	var node = e.target;
	if(node && node.className.toLowerCase() === "bar")
	{
		var index = [].indexOf.call(node.parentNode.childNodes,node);
		queue.splice(inde,1);
		node.parentNode.removeChild(node);
	}
});

init();

function init(){
	initData(40);
	render();
}

$("#sort").addEventListener("click",function(){
	if (queue.length == 0)
		alert("The queue is empty");
	queue.bubbleSort();
	timer = setInterval(paint,interval);
	function paint(){
		var snapshot = snapshots.shift() || [];
		if (snapshot.length !== 0){
			render(snapshot);
		}
		else
		{
			clearInterval(timer);
			return;
		}
	}
});

$("#left-in").addEventListener("click",function (){
	queue.unshift(getInputValue());
	render();
});

$("#right-in").addEventListener("click",function(){
	queue.push(getInputValue());
	render();
});

$("#left-out").addEventListener("click",function(){
	if (queue.length == 0)
		alert("The queue is empty");
	queue.shift();
	render();
});

$("#right-out").addEventListener("click",function(){
	if (queue.length == 0)
		alert("The queue is empty");
	queue.pop();
	render();
});

$("#random").addEventListener("click",function(){
	initData(40);
	render();
});

function bubbleSort(arr){
	snapshots = [];
	if (arr.length < 1){
		return arr;
	}
	var temp;
	for (var i = 0;i < arr.length;i ++){
		for (var j = 0;j < arr.length -i -1;j ++)
		{
			if (arr[j] > arr[j+1])
			{
				temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
				snapshots.push(JSON.parse(JSON.stringify(arr)));
			}
		}
	}
	return arr;
}

Array.prototype.bubbleSort = function(){
	return bubbleSort(this);
}

function initData(number){
	queue = [];
	for (var i = 0;i < number;i ++){
		queue.push(Math.floor(Math.random()*90+10));
	}
}

function render(arr){
	var array = arr || queue;
	var content = array.map(function(v){
		return "<div class='bar' style='height:"+(v*3)+"px;background-color:"+getColor(v)+"'></div>";
	}).join("");
	$(".chart").innerHTML = content;
}

function getInputValue(){
	if (queue.length >= 60)
		throw new Error("the length of the queue exceeds 60");
	var value = $("#number").value.trim();
	if(!isNumber(value))
		throw new Error("the input value is invalid");
	value = parseInt(value);
	if (value < 10 || value > 100)
		throw new Error("the input exceeds the limit");
	return value;
}

function isNumber(n){
	return !isNaN((parseFloat(n))) && isFinite(n);
}

function getColor(value){
	if (!isNumber(value))
	{
		return;
	}
	if (value < 60)
	{
		return colors[0];
	}
	else if (value >= 60 && value < 70){
		return colors[1];
	}
	else if (value >= 70 && value < 80){
		return colors[2];
	}
	else if (value >= 80 && value < 90){
		return colors[3];
	}
	else if (value >= 90 && value < 100){
		return colors[4];
	}
	else
	{
		return colors[5];
	}
}