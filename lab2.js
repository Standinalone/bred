function testFunction(arguments){
	//return Math.pow(arguments[0],4) + Math.pow(arguments[1],4) + Math.pow(arguments[0] + arguments[1], 2)
	return Math.pow(arguments[0],3) + Math.pow(arguments[1],3) + 3 * arguments[0] * arguments[1]
	//return Math.pow(arguments[0]+5,2) + Math.pow(arguments[1],2)
	//return Math.pow(arguments[0],2)
}

function draw(data, x, y){
	Plotly.newPlot('chart', [{
		   z: data,
		   type: 'surface',
		   x: x,
		   y: y,
	}]);
}


document.addEventListener("DOMContentLoaded", () => {
	
	
	document.getElementById("run").addEventListener("click", () =>{
		document.getElementById("answer").innerHTML = "";
		//eq = document.getElementById("equation").value;
		var start = parseFloat(document.getElementById("start").value);
		var end = parseFloat(document.getElementById("end").value);
		var eps = parseFloat(document.getElementById("epsilon").value);

		var arguments = []
		arguments.push(-1)
		arguments.push(3)
		
		var graph_arr = []
		
		var x = []
		var y = []
		for (let i = start; i < end; i+=50){
			x.push(i)
			y.push(i)
			var arr = []
			for (let j = start; j < end; j+=1){
				arr.push(testFunction([j, i]))
			}
			graph_arr.push(arr)
		}
		draw(graph_arr, x ,y)
		
		var A = 0.0
		var B = testFunction(arguments)
		var steps_ellapsed = 0
		var max_steps_count = 100
		var delta = 0.0
		
		var n = arguments.length;
		
		function testForStop(arr1, arr2){
			function getNorm(arr){
				var square_sum = 0
				for (var i = 0; i < arr.length; i++){
					square_sum += arr[i] * arr[i]
				}
				return Math.sqrt(square_sum)
			}
			function substract_vectors(arr1, arr2){
				var result_arr = []
				for (var i = 0; i < arr1.length; i++){
					result_arr.push(arr2[i]-arr1[i])
				}
				return result_arr
			}
			if (getNorm(substract_vectors(arr2, arr1)) <= eps)
				return true
			return false
			
		}
		for (var i = 0; i < max_steps_count; i++){
			A = B
			for (var j = 0; j < n; j++){
				var func = function(arg, arguments){
					arguments[j] = arg
					return testFunction(arguments)
				}
				arguments[j] = goldenRatioMinimum(func, start, end, eps, arguments)
			}
			B = testFunction(arguments)
			delta = Math.abs(A-B)
			if (delta <= eps){
				steps_ellapsed = i+1
				break
			}
		}
		
			
		document.getElementById("answer").innerHTML += "Понадобилось " + steps_ellapsed + " итераций<br>";
		document.getElementById("answer").innerHTML += arguments;
		document.getElementById("answer").innerHTML += "<br>";
		document.getElementById("answer").innerHTML += "Function(args) = " + testFunction(arguments);

		
	});
	document.getElementById("clean").addEventListener("click", () =>{
		document.getElementById("answer").innerHTML = "";
		document.getElementById("chart").innerHTML = "";
	});
	
});

function goldenRatioMinimum(fn, a, b, ε, arguments) {
	ε = ε || 1e-8;

	var φ = (-1 + Math.sqrt(5)) / 2;

	var x1 = a + (1 - φ) * (b - a);
	var x2 = b - (1 - φ) * (b - a);

	var A = fn(x1, arguments);
	var B = fn(x2, arguments);

	while(b - a > ε) {
		if(A < B) {
			b = x2;
			x2 = x1;
			B = A;
			x1 = a + (1 - φ) * (b - a);
			A = fn(x1, arguments);
		} else {
			a = x1;
			x1 = x2;
			A = B;
			x2 = b - (1 - φ) * (b - a);
			B = fn(x2, arguments);
		}
	}

	var x = (a + b) / 2;
	x = Math.abs(x) < 1e-6 ? 0 : x;

	return x
}

