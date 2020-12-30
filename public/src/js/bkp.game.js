const Game = function(){
	const game = {};

	const enemy = {
		name: document.getElementById("enemy-name"),
		img: document.getElementById("enemy-img"),
		life: document.getElementById("enemy-life"),
		energy: document.getElementById("enemy-energy"),
		mana: document.getElementById("enemy-mana")
	};

	const player = {
		name: document.getElementById("player-name"),
		img: document.getElementById("player-img"),
		life: document.getElementById("player-life"),
		energy: document.getElementById("player-energy"),
		mana: document.getElementById("player-mana")
	};
	
	const startGame = async () => {
		const headers = new Headers();
		const body = JSON.stringify({ token: game.token });
		headers.append('Content-Type', 'application/json');

		return fetch('/game/battle/init', { method: 'POST', headers, body })
			.then(res => res.json())
			.then(res => res)
			.catch(er => console.error(er.message));
	}

	const initializeVarGame = () => {
		game.round = 5;
		game.acts = [];
	}

	const loadStats = () => {
		const enemyStats = {
			life: document.getElementById('spn-enemy-life'),
			energy: document.getElementById('spn-enemy-energy'),
			mana: document.getElementById('spn-enemy-mana')
		};
		enemyStats.life.innerText = game.enemy.life;
		enemyStats.energy.innerText = game.enemy.energy;
		enemyStats.mana.innerText = game.enemy.mana;
		
		const playerStats = {
			life: document.getElementById('spn-player-life'),
			energy: document.getElementById('spn-player-energy'),
			mana: document.getElementById('spn-player-mana')
		};
		playerStats.life.innerText = game.player.life;
		playerStats.energy.innerText = game.player.energy;
		playerStats.mana.innerText = game.player.mana;
	};

	const loadView = () => {
		enemy.img.setAttribute('data-src', `src/img/${game.enemy.image}`);
		enemy.life.setAttribute('max', game.enemy.life);
		enemy.life.setAttribute('value', game.enemy.life);

		player.life.setAttribute('max', game.player.life);
		player.life.setAttribute('value', game.player.life);

		enemy.energy.setAttribute('max', game.enemy.energy);
		enemy.energy.setAttribute('value', game.enemy.energy);

		player.energy.setAttribute('max', game.player.energy);
		player.energy.setAttribute('value', game.player.energy);

		enemy.mana.setAttribute('max', game.enemy.mana);
		enemy.mana.setAttribute('value', game.enemy.mana);

		player.mana.setAttribute('max', game.player.mana);
		player.mana.setAttribute('value', game.player.mana);

		enemy.name.innerText = game.enemy.name;
	};

	const getMatch = async () => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const body = JSON.stringify({ token: game.token });
		return fetch('/game/find', { method: 'POST', headers, body })
			.then(res => res.json())
			.then(res => res);
	};

	const getGame = async () => {
		return fetch('/game', { method: 'GET' })
			.then(res => res.json())
			.then(res => res);
	};

	const init = async () => {
		game.token = await getGame()
			.then(res => { if(res.ok) return res; else throw new Error('Erro ao tentar buscar o token') })
			.then(res => res.token);
		let { enemy, player } = await getMatch()
			.then(res => { if(res.ok) return res; else throw new Error('Erro ao tentar buscar a partida') })
			.then(res => res);
		game.enemy = enemy;
		game.player = player;
	};
}