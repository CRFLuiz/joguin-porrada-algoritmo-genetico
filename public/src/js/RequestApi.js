const RequestApi = function(){}

RequestApi.prototype.attack = function(){
	alert(`Aqui será feito o request de ataque\nArgumento 1: ${arguments[0]}\nArgumento 2: ${arguments[1]}`);
}