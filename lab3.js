"use strict"
let log = ""
document.addEventListener("DOMContentLoaded", () => {
	let eps = document.getElementById('epsilon').value
	let x_start = document.getElementById('start').value.split(',').map(Number)
	document.getElementById('run').addEventListener('click', () => FletcherRivz(eps, x_start))
});


const myFunction = x_vector => x_vector[0] + x_vector[1]*x_vector[1] + Math.pow((x_vector[0]+x_vector[1]-10)/3,2)
//const myFunction = x_vector => 5*(x_vector[0]-3)*(x_vector[0]-3)+(x_vector[1]-5)*(x_vector[1]-5)
//const myFunction = x_vector => x_vector[0]*x_vector[0] + x_vector[1]*x_vector[1]
//const myFunction = x_vector => x_vector[0]*x_vector[0] + 4*x_vector[1]*x_vector[1]-1
//const myFunction = x_vector => x_vector[0]*x_vector[0]*x_vector[0] -4*x_vector[1]

function findDerivative(func,x_vector,num){
	let arr_first = x_vector.map((v,i,arr) => i!=num?v=0:v=v)
	let arr_second = [...arr_first]
	arr_second[num] += 0.0000001
	return (func(arr_second)-func(arr_first))/0.0000001
}

function gradient (x_vector){
	let grad = []
	for (let i = 0; i < x_vector.length; i++){
		grad.push(findDerivative(myFunction, x_vector, i))
	}
	return grad
}

const getScalar = (vector1, vector2) => vector1.reduce((total, value, index, array) => total + value*vector2[index],0)

function getStep(x_k,p_k){
	return -getScalar(gradient(x_k),p_k)/getScalar(p_k,secondDerivativeMatrix(myFunction,x_k).map((v,i,a)=>v*=p_k[i]))
}

function getNorm(x_vector){
	return Math.pow(x_vector.reduce((t,v,i,a) => t+v*v,0),1/2)
}

function getSum(a,b){
	return a.map((v,i,a) => v += b[i])
}

function secondDerivativeMatrix(func,x_k){
	let matrix = []
	for (let i = 0; i<gradient(x_k).length; i++){
		let x_k_new = [...x_k]
		x_k_new[i] += 0.0000001
		
		matrix.push((findDerivative(myFunction,x_k_new,i)-findDerivative(myFunction,x_k,i))/0.0000001)
	}
	return matrix
}

function FletcherRivz(e1, x_start){
	// Step 1
	let max_iterations = 1000
	//let x_start = [-1,-1]
	//let e1 = 0.00001
	//let e2 = 0.00001

	//Step 2
	let p_0 = gradient([...x_start]).map(el=>-el)
	console.log('p_0: '+p_0)

	let k = 0
	let a_k = 0
	let p_k = [...p_0]
	let p_k_1 = [...p_0]
	let x_k = [...x_start]
	let x_k_1 = [...x_start]


	while(k<max_iterations){
		
		log+='===' + '<br>'
		// console.log('===')

		//Step 3

		a_k = getStep(x_k, p_k)
		
		log+='a_k: '+a_k + '<br>'
		// console.log('a_k: '+a_k)

		//Step 4

		x_k = getSum(x_k,p_k.map(el=>el*a_k))
		log+='x_k: '+x_k.map(el=>el.toFixed(2)) + '<br>'
		log+='z(x_k): '+myFunction(x_k).toFixed(2) + '<br>'
		log+='Norm: '+getNorm(gradient(x_k)) + '<br>'
		// console.log('x_k: '+x_k.map(el=>el.toFixed(2)))
		// console.log('z(x_k): '+myFunction(x_k).toFixed(2))
		// console.log('Norm: '+getNorm(gradient(x_k)))

		//Step 5-6

		if (getNorm(gradient(x_k))<e1){
			break
		}

		//Step 7

		let temp = getScalar(gradient(x_k),gradient(x_k))/getScalar(gradient(x_k_1),gradient(x_k_1))
		p_k = getSum(gradient(x_k).map(el => -el),p_k_1.map(el=>el*temp))
		
		log+='p_k: '+p_k + '<br>'
		// console.log('p_k: '+p_k)

		x_k_1 = x_k
		p_k_1 = p_k
		k++
	}
	// console.log('Finished')
	log+='Iterations: '+k
	// console.log('Iterations: '+k)
	document.getElementById("answer").innerHTML = log
}
