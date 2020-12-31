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
	if(arguments[0]){ 
		this.currentResponse = arguments[0];
		return this.updateView();
	}
	const headers = new Headers();
	const body = JSON.stringify({ token: this.game.token });
	headers.append('Content-Type', 'application/json');
	return fetch('/game/battle/init', { method: 'POST', headers, body })
		.then(res => res.json())
		.then(res => {
			this.currentResponse = res;
			return res;
		})
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
	enemyStats.life.innerText = this.currentResponse.battle.enemy.life;
	enemyStats.energy.innerText = this.currentResponse.battle.enemy.energy;
	enemyStats.mana.innerText = this.currentResponse.battle.enemy.mana;
	
	// LOAD PLAYER STATS
	const playerStats = {
		life: document.getElementById('spn-player-life'),
		energy: document.getElementById('spn-player-energy'),
		mana: document.getElementById('spn-player-mana')
	};
	playerStats.life.innerText = this.currentResponse.battle.player.life;
	playerStats.energy.innerText = this.currentResponse.battle.player.energy;
	playerStats.mana.innerText = this.currentResponse.battle.player.mana;
};

Game.prototype.loadViewActions = function(){
	console.log('currentResponse', this.currentResponse)
	const hitsObj = [];
	const skillsObj = [];
	const healthyObj = [];
	const callback = async (arg) => await this.startGame(arg);

	for(let i = 0; i < this.currentResponse.battle.actions.punch.length; i++){
		let act = this.currentResponse.battle.actions.punch[i];
		hitsObj.push({ 
			id: `btn-player-punch${i}`, 
			classColor: "secondary", 
			className: "btn-player-action", 
			enabled: act.enabled,
			callback: () => _req.attack(this.game.token, act, callback), 
			inner: { 
				icon: "forward", 
				text: act.name
			} 
		});
	}
	for(let i = 0; i < this.currentResponse.battle.actions.kick.length; i++){
		let act = this.currentResponse.battle.actions.kick[i];
		hitsObj.push({ 
			id: `btn-player-kick${i}`, 
			classColor: "secondary", 
			className: "btn-player-action", 
			enabled: act.enabled,
			callback: () => _req.attack(this.game.token, act, callback), 
			inner: { 
				icon: "forward", 
				text: act.name
			} 
		});
	}

	for(let i = 0; i < this.currentResponse.battle.actions.skills.length; i++){
		let act = this.currentResponse.battle.actions.skills[i];
		skillsObj.push({ 
			id: `btn-player-skill${i}`, 
			classColor: "danger", 
			className: "btn-player-action", 
			enabled: act.enabled,
			callback: () => _req.attack(this.game.token, act, callback), 
			inner: { 
				icon: "forward", 
				text: act.name 
			} 
		});
	}

	for(let i = 0; i < this.currentResponse.battle.actions.healthy.length; i++){
		let act = this.currentResponse.battle.actions.healthy[i];
		healthyObj.push({ 
			id: `btn-player-healthy${i}`, 
			classColor: "primary", 
			className: "btn-player-action", 
			enabled: act.enabled,
			callback: () => _req.attack(this.game.token, act, callback), 
			inner: { 
				icon: "forward", 
				text: act.name
			} 
		});
	}

	const _el = new Element();
	const _req = new RequestApi();

	const btnHits = _el.button({ selector: { id: "player-actions-hits" } });
	const btnSkills = _el.button({ selector: { id: "player-actions-skills" } });
	const btnHealthy = _el.button({ selector: { id: "player-actions-healthy" } });
	
	btnHits.cleanup();
	btnSkills.cleanup();
	btnHealthy.cleanup();

	btnHits.create(hitsObj);

	btnSkills.create(skillsObj);

	btnHealthy.create(healthyObj);

	// btnSkills.remove([{ id: "btn-player-skillA" }]); //EXAMPLE TO REMOVE BUTTON
};

Game.prototype.verifyGame = function(){
	if(this.currentResponse.battle.enemy.life <= 0 || this.currentResponse.battle.player.life <= 0)
		alert(`Game Over.\n The ${this.currentResponse.battle.enemy.life <= 0 ? "enemy" : "player"} was die.`);
};

Game.prototype.updateView = function(){
	// UPDATE ENEMY PROGRESS BARS
	this.enemy.life.setAttribute('value', this.currentResponse.battle.enemy.life);
	this.enemy.energy.setAttribute('value', this.currentResponse.battle.enemy.energy);
	this.enemy.mana.setAttribute('value', this.currentResponse.battle.enemy.mana);

	// UPDATE PLAYER PROGRESS BARS
	this.player.life.setAttribute('value', this.currentResponse.battle.player.life);
	this.player.energy.setAttribute('value', this.currentResponse.battle.player.energy);
	this.player.mana.setAttribute('value', this.currentResponse.battle.player.mana);
	
	// CREATE BUTTONS WITH PLAYER ACTIONS
	this.loadStats();
	this.loadViewActions();
	this.verifyGame();
};

Game.prototype.loadView = function(){
	// UPDATE ENEMY IMAGE AND PROGRESS BARS
	this.enemy.name.innerText = this.currentResponse.battle.enemy.name;
	this.enemy.img.setAttribute('data-src', `src/img/${this.currentResponse.battle.enemy.image}`);

	this.enemy.life.setAttribute('max', this.currentResponse.battle.enemy.life);
	this.enemy.life.setAttribute('value', this.currentResponse.battle.enemy.life);
	
	this.enemy.energy.setAttribute('max', this.currentResponse.battle.enemy.energy);
	this.enemy.energy.setAttribute('value', this.currentResponse.battle.enemy.energy);
	
	this.enemy.mana.setAttribute('max', this.currentResponse.battle.enemy.mana);
	this.enemy.mana.setAttribute('value', this.currentResponse.battle.enemy.mana);

	// UPDATE PLAYER IMAGE AND PROGRESS BARS
	this.player.life.setAttribute('max', this.currentResponse.battle.player.life);
	this.player.life.setAttribute('value', this.currentResponse.battle.player.life);

	this.player.energy.setAttribute('max', this.currentResponse.battle.player.energy);
	this.player.energy.setAttribute('value', this.currentResponse.battle.player.energy);

	this.player.mana.setAttribute('max', this.currentResponse.battle.player.mana);
	this.player.mana.setAttribute('value', this.currentResponse.battle.player.mana);
	
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
	return this.getMatch();
	// 	.then(res => { if(res.ok) return res; else throw new Error('Erro ao tentar buscar a partida') })
	// 	.then(res => res);
	// this.currentResponse.battle.enemy = enemy;
	// this.currentResponse.battle.player = player;
};