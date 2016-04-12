window.onload = function (){
	//verify the input
	function isLegal(func){
		if (input.value == "" || !new RegExp("^[0-9]*$").test(input.value))
		{
			return false;
		}
		else
			return true;
	}

	//declare the variable
	var lists,
	input = $("input-text"),
	leftIn = $("leftIn"),
	leftOut = $("leftOut"),
	rightIn = $("rightIn"),
	rightOut = $("rightOut"),
	myUl = $("ul"),
	myLi = myUl.getElementsByTagName('li');

	//encapsule the function to operate
	function doMove(type){
		var removeLi,
		newLi = document.createElement("li");
		newLi.innerHTML = input.value;
		switch(type)
		{
			case 'leftIn':
				myUl.insertBefore(newLi,myUl.childNodes[0]);
				input.value = "";
				break;
			case 'rightIn':
				myUl.appendChild(newLi);
				input.value = "";
				break;
			case 'leftOut':
				if (myLi.length === 0){
					alert("There is no element in the queue!");
				}
				else
				{
					removeLi = myUl.removeChild(myLi[0]);
				}
				input.value = "";
				break;
			case 'rightOut':
				if (myLi.length === 0){
					alert("There is no element in the queue");
				}
				else
				{
					removeLi = myUl.removeChild(myLi[myLi.length-1]);
				}
				input.value = "";
				break;
		}
	}

	//left in
	leftIn.addEventListener("click",function(){
		if (isLegal()){
			doMove("leftIn");
		}
		else
		{
			alert("please enter the number");
		}
	});

	//right in 
	rightIn.addEventListener("click",function(){
		if (isLegal()){
			doMove("rightIn");
		}
		else
		{
			alert("please enter the number");
		}
	});

	//left out
	leftOut.addEventListener("click",function(){
		doMove("leftOut");
	});

	//right out
	rightOut.addEventListener("click",function(){
		doMove("rightOut");
	})

	//delete the element when clicking
		myUl.addEventListener("click", function (e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName == "LI") {
            this.removeChild(target);
        }
});

	function $(id){
		return document.getElementById(id);
	}
};