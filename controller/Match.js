import Npc from '../model/Npc.js';

class Match {
    constructor(player){
        this.player = player;
        this.battle = {};
    }

    getARandomMatch(){
        let npc = new Npc();
        this.npc = npc.getRandomNpc();
    }

    verifySimpleEnergyMana(actObj, stats){
        let phases = { recovery: { energy: false, mana: false}, attack: { energy: false, mana: false } };
        if(actObj.energy <= 0 && Math.abs(actObj.energy) < stats.energy) phases.attack.energy = true;
        if(actObj.mana <= 0 && Math.abs(actObj.mana) < stats.mana) phases.attack.mana = true;
        if(actObj.energy > 0) phases.recovery.energy = true;
        if(actObj.mana > 0) phases.recovery.mana = true;
        if((phases.recovery.energy || phases.recovery.mana) || (phases.attack.energy && phases.attack.mana)) return true;
        
        return false
    }

    verifyArrayEnergyMana(actObj, stats){
        let phases = { recovery: { energy: false, mana: false}, attack: { energy: false, mana: false } };
        if(actObj.energy <= 0 && Math.abs(actObj.energy) < stats.energy) phases.attack.energy = true;
        if(actObj.mana <= 0 && Math.abs(actObj.mana) < stats.mana) phases.attack.mana = true;
        if(actObj.energy > 0) phases.recovery.energy = true;
        if(actObj.mana > 0) phases.recovery.mana = true;
        if((phases.recovery.energy || phases.recovery.mana) || (phases.attack.energy && phases.attack.mana)) return true;
    }

    verifyEnergyMana(actObj, stats){
        if(!Array.isArray(actObj)){
            if(this.verifySimpleEnergyMana(actObj, stats)) return actObj;
        }else{
            let arrayMap = actObj.map(act => {
                if(this.verifySimpleEnergyMana(act, stats)) return act;
            });

            if(arrayMap.length > 0) return arrayMap;
        }
        return null;
    }

    getAllowedActions(char){
        let _char = this.battle[char];
        let stats = {
            energy: _char.energy,
            mana: _char.mana,
            fight: _char.fight
        };
        const _allowedActions = {};
        for(let [actName, actObj] of Object.entries(stats.fight)){
            let act = this.verifyEnergyMana(actObj, stats);
            if(act !== null) _allowedActions[actName] = act;
        };
        return _allowedActions;
    }

    initBattle(){
        if(!(this.npc !== undefined && this.npc !== null)){
            return new Error("Don't exists NPC to the battle.")
        }
        this.battle.round = 0;
        this.battle.enemy = this.npc;
        this.battle.player = this.player;
        this.battle.actions = [];
        this.battle.allowedActions = this.getAllowedActions('player');
        return true;
    }
}

export default Match;