import enemys from '../db/enemys.js';

class Enemy {
    getRandomEnemy(){
        const random = Math.floor(Math.random() * enemys.length);
        return enemys[random];
    }
}

export default Enemy;