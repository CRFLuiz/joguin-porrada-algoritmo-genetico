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

        return this.describeNpc(token);
    }

    describeNpc(token){
        return this.looby[token].match.npc || new Error('Token inválido');
    }

    describePlayer(token){
        return this.looby[token].match.char || new Error('Token inválido');
    }

    initBattle(token){
        this.looby[token].match.initBattle();
        return this.looby[token].match.battle;
    }

    getRound(token){
        const battle = this.looby[token].match.battle;
        console.log(battle);
    }

    postRound(){}
}

export default Room;