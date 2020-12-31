const RequestApi = function(){}

RequestApi.prototype.attack = async function(token, action, callback){
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	const body = JSON.stringify({ token, action });
	return fetch('/game/battle/attack', { method: 'POST', headers, body })
		.then(res => res.json())
		.then(res => {
			if(res.ok){
				return callback(res);
			}
		});
}