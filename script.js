const delta = 0.00000001 
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("run").addEventListener("click", () =>{
		var eq = document.getElementById("equation").value;
		var start = parseFloat(document.getElementById("start").value);
		var end = parseFloat(document.getElementById("end").value);
		var epsilon = parseFloat(document.getElementById("epsilon").value);
		var step = parseFloat(document.getElementById("step").value);
		
		var x;
		var f = Function('eq, x', 'return eval(eq)');
		
		for (var i = start; i < end+step; i += step){
			x = Math.round(i*100)/100;
			y = Math.round(eval(eq)*100)/100;
			document.getElementById("answer").innerHTML += "X: " + x + "\t Y: " + y + "\tDer: " + firstDer(f, eq, x) + "<br>";
		}
		 
		
	});
	document.getElementById("clean").addEventListener("click", () =>{
		document.getElementById("answer").innerHTML = "";
	});
});

function firstDer (func, equation, argument){
	return Math.round((func(equation, argument+delta)-func(equation, argument))/delta*100)/100;
}

