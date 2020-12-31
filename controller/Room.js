import Game from '../controller/Game.js';

class Room{
    constructor() {
        this.looby = {};
    }

    findGame(){
        const game = new Game();
        const token = game.getToken();
        this.looby[token] = game;
        return token;
    }

    loadsARandomMatch(token){
        const game = this.looby[token];
        game.getRandomMatch();

        return this.describeEnemy(token);
    }

    describeEnemy(token){
        return this.looby[token].match.battle.enemy || new Error('Token inválido');
    }

    describePlayer(token){
        return this.looby[token].match.battle.player || new Error('Token inválido');
    }

    turnBattle(token){
        this.looby[token].match.turnBattle();
        return this.looby[token].match.battle;
	}
	
	attack(token, action){
		if(this.looby[token].match.playerAttack(action)) return this.looby[token].match.battle;
		throw new Error('Error on Room.attack()');
	}

    getRound(token){
        const battle = this.looby[token].match.battle;
        console.log(battle);
    }

    postRound(){}
}

export default Room;