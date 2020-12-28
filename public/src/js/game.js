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
    const npcStats = {
        life: document.getElementById('spn-npc-life'),
        energy: document.getElementById('spn-npc-energy'),
        mana: document.getElementById('spn-npc-mana')
    };
    npcStats.life.innerText = game.npc.life;
    npcStats.energy.innerText = game.npc.energy;
    npcStats.mana.innerText = game.npc.mana;
    
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
    npc.img.setAttribute('data-src', `src/img/${game.npc.image}`);
    npc.life.setAttribute('max', game.npc.life);
    npc.life.setAttribute('value', game.npc.life);

    player.life.setAttribute('max', game.player.life);
    player.life.setAttribute('value', game.player.life);

    npc.energy.setAttribute('max', game.npc.energy);
    npc.energy.setAttribute('value', game.npc.energy);

    player.energy.setAttribute('max', game.player.energy);
    player.energy.setAttribute('value', game.player.energy);

    npc.mana.setAttribute('max', game.npc.mana);
    npc.mana.setAttribute('value', game.npc.mana);

    player.mana.setAttribute('max', game.player.mana);
    player.mana.setAttribute('value', game.player.mana);

    npc.name.innerText = game.npc.name;
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
    let { npc, player } = await getMatch()
        .then(res => { if(res.ok) return res; else throw new Error('Erro ao tentar buscar a partida') })
        .then(res => res);
    game.npc = npc;
    game.player = player;
};

// INITIALIZERS:
const game = {};

const npc = {
    name: document.getElementById("npc-name"),
    img: document.getElementById("npc-img"),
    life: document.getElementById("npc-life"),
    energy: document.getElementById("npc-energy"),
    mana: document.getElementById("npc-mana")
};

const player = {
    name: document.getElementById("player-name"),
    img: document.getElementById("player-img"),
    life: document.getElementById("player-life"),
    energy: document.getElementById("player-energy"),
    mana: document.getElementById("player-mana")
};

init()
    .then(() => loadView())
    .then(() => loadStats())
    .then(() => initializeVarGame())
    .then(() => startGame())
    
    .then(r => console.log(r));
