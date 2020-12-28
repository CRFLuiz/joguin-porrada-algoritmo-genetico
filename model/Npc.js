import npcs from '../db/npcs.js';

class Npc {
    getRandomNpc(){
        const random = Math.floor(Math.random() * npcs.length);
        return npcs[random];
    }
}

export default Npc;