import Enemy from '../model/Enemy.js';

class Match {
    constructor(player){
        this.player = player;
        this.battle = {};
    }

    getARandomMatch(){
        let enemy = new Enemy();
        this.enemy = enemy.getRandomEnemy();
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

    // verifyArrayEnergyMana(actObj, stats){
    //     let phases = { recovery: { energy: false, mana: false}, attack: { energy: false, mana: false } };
    //     if(actObj.energy <= 0 && Math.abs(actObj.energy) < stats.energy) phases.attack.energy = true;
    //     if(actObj.mana <= 0 && Math.abs(actObj.mana) < stats.mana) phases.attack.mana = true;
    //     if(actObj.energy > 0) phases.recovery.energy = true;
    //     if(actObj.mana > 0) phases.recovery.mana = true;
    //     if((phases.recovery.energy || phases.recovery.mana) || (phases.attack.energy && phases.attack.mana)) return true;
    // }

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

    initBattle(){
        if(!(this.enemy !== undefined && this.enemy !== null)){
            return new Error("Don't exists ENEMY to the battle.")
        }
        this.battle.round = 0;
        this.battle.enemy = this.enemy;
        this.battle.player = this.player;
        this.battle.actions = [];
        this.battle.actions = this.getAllowedActions('player');
        return true;
    }
}

export default Match;