const Game = function(){
	this.game = {};

	this.enemy = {
		name: document.getElementById("enemy-name"),
		img: document.getElementById("enemy-img"),
		life: document.getElementById("enemy-life"),
		energy: document.getElementById("enemy-energy"),
		mana: document.getElementById("enemy-mana")
	};

	this.player = {
		name: document.getElementById("player-name"),
		img: document.getElementById("player-img"),
		life: document.getElementById("player-life"),
		energy: document.getElementById("player-energy"),
		mana: document.getElementById("player-mana")
	};
	
	
}

Game.prototype.startGame = async function(){
	const headers = new Headers();
	const body = JSON.stringify({ token: this.game.token });
	headers.append('Content-Type', 'application/json');

	return fetch('/game/battle/init', { method: 'POST', headers, body })
		.then(res => res.json())
		.then(res => res)
		.catch(er => console.error(er.message));
}

Game.prototype.initializeVarGame = function(){
	// this.game.round = 0;
	// this.game.acts = [];
}

Game.prototype.loadStats = function(){
	// LOAD ENEMY STATS
	const enemyStats = {
		life: document.getElementById('spn-enemy-life'),
		energy: document.getElementById('spn-enemy-energy'),
		mana: document.getElementById('spn-enemy-mana')
	};
	enemyStats.life.innerText = this.game.enemy.life;
	enemyStats.energy.innerText = this.game.enemy.energy;
	enemyStats.mana.innerText = this.game.enemy.mana;
	
	// LOAD PLAYER STATS
	const playerStats = {
		life: document.getElementById('spn-player-life'),
		energy: document.getElementById('spn-player-energy'),
		mana: document.getElementById('spn-player-mana')
	};
	playerStats.life.innerText = this.game.player.life;
	playerStats.energy.innerText = this.game.player.energy;
	playerStats.mana.innerText = this.game.player.mana;
};

Game.prototype.loadViewActions = function(){
	const _el = new Element();
	const _req = new RequestApi();

	const btnHits = _el.button({ selector: { id: "player-actions-hits" } });
	const btnSkills = _el.button({ selector: { id: "player-actions-skills" } });
	const btnHealthy = _el.button({ selector: { id: "player-actions-healthy" } });
	
	btnHits.cleanup();
	btnSkills.cleanup();
	btnHealthy.cleanup();

	btnHits.create([
		{ id: "btn-player-punch", classColor: "secondary", className: "btn-player-action", callback: _req.attack, inner: { icon: "forward", text: "punch" } },
		{ id: "btn-player-kick", classColor: "secondary", className: "btn-player-action", callback: _req.attack, inner: { icon: "forward", text: "kick" } }
	]);

	btnSkills.create([
		{ id: "btn-player-skillA", classColor: "danger", className: "btn-player-action", callback: _req.attack, inner: { icon: "forward", text: "Skill 1" } },
		{ id: "btn-player-skillB", classColor: "danger", className: "btn-player-action", callback: _req.attack, inner: { icon: "forward", text: "Skill 2" } }
	]);

	btnHealthy.create([
		{ id: "btn-player-healthy", classColor: "primary", className: "btn-player-action", callback: _req.attack, inner: { icon: "forward", text: "Healthy" } }
	]);

	// btnSkills.remove([{ id: "btn-player-skillA" }]); //EXAMPLE TO REMOVE BUTTON
};

Game.prototype.loadView = function(){
	// UPDATE ENEMY IMAGE AND PROGRESS BARS
	this.enemy.name.innerText = this.game.enemy.name;
	this.enemy.img.setAttribute('data-src', `src/img/${this.game.enemy.image}`);

	this.enemy.life.setAttribute('max', this.game.enemy.life);
	this.enemy.life.setAttribute('value', this.game.enemy.life);
	
	this.enemy.energy.setAttribute('max', this.game.enemy.energy);
	this.enemy.energy.setAttribute('value', this.game.enemy.energy);
	
	this.enemy.mana.setAttribute('max', this.game.enemy.mana);
	this.enemy.mana.setAttribute('value', this.game.enemy.mana);

	// UPDATE PLAYER IMAGE AND PROGRESS BARS
	this.player.life.setAttribute('max', this.game.player.life);
	this.player.life.setAttribute('value', this.game.player.life);

	this.player.energy.setAttribute('max', this.game.player.energy);
	this.player.energy.setAttribute('value', this.game.player.energy);

	this.player.mana.setAttribute('max', this.game.player.mana);
	this.player.mana.setAttribute('value', this.game.player.mana);
	
	// CREATE BUTTONS WITH PLAYER ACTIONS
	this.loadViewActions();
};

Game.prototype.getMatch = async function(){
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	const body = JSON.stringify({ token: this.game.token });
	return fetch('/game/find', { method: 'POST', headers, body })
		.then(res => res.json())
		.then(res => res);
};

Game.prototype.getGame = async function(){
	return fetch('/game', { method: 'GET' })
		.then(res => res.json())
		.then(res => res);
};

Game.prototype.init = async function(){
	this.game.token = await this.getGame()
		.then(res => { if(res.ok) return res; else throw new Error('Erro ao tentar buscar o token') })
		.then(res => res.token);
	let { enemy, player } = await this.getMatch()
		.then(res => { if(res.ok) return res; else throw new Error('Erro ao tentar buscar a partida') })
		.then(res => res);
	this.game.enemy = enemy;
	this.game.player = player;
};