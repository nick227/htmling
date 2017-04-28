module.exports = `
function addControls(){
	var controlbar = document.createElement('div');
	controlbar.className = 'controlbar';
	/***/
	var next = document.createElement('a');
	next.innerHTML = 'next';
	next.setAttribute("id", "btn-next");
	/***/
	var previous = document.createElement('a');
	previous.innerHTML = 'previous';
	previous.setAttribute("id", "btn-previous");
	/***/
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("disabled", "true");
	input.setAttribute("id", "nav-position");
	input.setAttribute("value", 0);
	/***/
	var totalCount = document.createElement("span");
	totalCount.innerHTML = '/'+(document.getElementsByClassName('outer-elm').length-1);
	/***/
	controlbar.appendChild(previous);
	controlbar.appendChild(next);
	controlbar.appendChild(input);
	controlbar.appendChild(totalCount);
	/***/
	var section = document.getElementById('body-main');
	section.appendChild(controlbar);

}
function advance(direction){
	var end = document.getElementsByClassName('outer-elm').length;
	var currentPosition = parseInt(document.getElementById('nav-position').value);
	var newPosition = direction === 'next' ? (currentPosition <= end ? currentPosition+1 : end) : (currentPosition > 0 ? currentPosition-1 : 0);
	if(currentPosition === newPosition || newPosition >= end){return false;}
	document.getElementById('nav-position').value = newPosition;
	hideAll();
	show(newPosition);

}
function show(idx){
	$('.outer-elm:eq('+idx+')').css('display', 'flex');
}
function hideAll(){
	$('.outer-elm').css('display', 'none');
}
function addHandlers(){
	var nextBtn = document.getElementById('btn-next');
	var prevBtn = document.getElementById('btn-previous');
	nextBtn.addEventListener('click', function(el){
		advance('next');
	});
	prevBtn.addEventListener('click', function(el){
		advance('previous');
	});
}
$('.item').css('height', window.innerHeight*.705+'px');
$('.outer-elm').css('height', window.innerHeight*.80+'px');
show(0);
addControls();
addHandlers();
`;