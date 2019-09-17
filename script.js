var d = new Date('November 16, 2019 18:27:0');

 
document.addEventListener("DOMContentLoaded", () =>{
	startTime();
});

function startTime(){
	var now = new Date();
	var diff = d-now;

	var seconds = Math.floor(diff/1000);
	var minutes = Math.floor(seconds/60);
	var hours = Math.floor(minutes/60);
	var days = Math.floor(hours / 24);
	mseconds = diff % 1000;
	seconds %= 60;
	minutes %= 60;
	hours %= 24;
	document.getElementById("time").innerHTML = days + 'd ' + hours + ' : ' + minutes + ' : ' + seconds + ' : ' + mseconds;
	t = setTimeout(function() {startTime()} , 50);
}