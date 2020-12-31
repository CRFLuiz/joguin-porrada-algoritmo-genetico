import Enemy from '../model/Enemy.js';

class Match {
    constructor(player){
        this.battle = { player, round: -1, actions: [] };
    }

    getARandomMatch(){
        let enemy = new Enemy();
        this.battle.enemy = enemy.getRandomEnemy();
    }

    verifySimpleEnergyMana(actObj, stats){
		let attackEnergy = (actObj.energy <= 0 && Math.abs(actObj.energy) < stats.energy);
        let attackMana = (actObj.mana <= 0 && Math.abs(actObj.mana) < stats.mana);
        let recoveryEnergy = (actObj.energy > 0);
        let recoveryMana = (actObj.mana > 0);
		
		let phases = { recovery: { energy: attackEnergy, mana: attackMana}, attack: { energy: recoveryEnergy, mana: recoveryMana } };
		let enabled = ((phases.recovery.energy || phases.recovery.mana) || (phases.attack.energy && phases.attack.mana));
		
		return { ...actObj, enabled };
    }

    verifyEnergyMana(actObj, stats){
        if(Array.isArray(actObj)){
			return actObj.map(act => {
                return this.verifySimpleEnergyMana(act, stats);
            });
		}

		return this.verifySimpleEnergyMana(actObj, stats);
    }

    getAllowedActions(char){
        let _char = this.battle[char];
        let stats = {
            energy: _char.energy,
            mana: _char.mana,
            fight: _char.fight
        };
        const _allowedActions = {};
        for(let [actName, actArr] of Object.entries(stats.fight)){
            _allowedActions[actName] = this.verifyEnergyMana(actArr, stats);
        };
        return _allowedActions;
    }

    turnBattle(){
        if(!(this.battle.enemy !== undefined && this.battle.enemy !== null)){
            return new Error("Don't exists ENEMY to the battle.")
        }
        this.battle.round += 1;
        this.battle.actions = this.getAllowedActions('player');
        return true;
	}
	
	playerAttack(action){
		if(action.enabled){
			let enemyNewLife = this.battle.enemy.life - action.damage;
			
			let playerNewEnergy = this.battle.player.energy + action.energy;
			let playerNewMana = this.battle.player.mana + action.mana;

			this.battle.enemy = { ...this.battle.enemy, life: enemyNewLife };
			this.battle.player = { ...this.battle.player, energy: playerNewEnergy, mana: playerNewMana };
			return this.turnBattle();
		}
		return false;
	}
}

export default Match;