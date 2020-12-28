import Sign from './Sign.js';
import Match from './Match.js';

const sign = new Sign();

class Game{
    constructor(){
        this.token = sign.up();
        this.generateChar();
        this.match = {};
    }

    getToken(){
        return this.token;
    }

    generateChar(){
        let _char = {
            name: "Player",
            image: "",
            life: 100,
            energy: 100,
            mana: 20,
            fight: {
                punch: { damage: 15, energy: -2, mana: 0 },
                kick: { damage: 5, energy: -2, mana: 0 },
                skills: [
                    { damage: 42, energy: -5, mana: -6 },
                    { damage: 60, energy: -6, mana: -10 }
                ],
                healthy: { damage: 0, energy: 10, mana: 5 }
            }
        };
        
        this.char = _char;
    }

    getRandomMatch(){
        const _match = new Match(this.char);
        _match.getARandomMatch();
        this.match = _match;
    }
}

export default Game;