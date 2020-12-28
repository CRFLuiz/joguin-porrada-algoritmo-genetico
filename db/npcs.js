export default [
    {
        name: "Aleifr",
        image: "npc01",
        life: 100,
        energy: 75,
        mana: 30,
        fight: {
            soco: { dano: 15, energia: -2, mana: 0 },
            chute: { dano: 10, energia: -2, mana: 0 },
            skills: [
                { dano: 35, energia: -5, mana: -6 },
                { dano: 50, energia: -6, mana: -10 }
            ],
            recuperação: { dano: 0, energia: 10, mana: 5 }
        }
    }, {
        name: "Einar",
        image: "npc02",
        life: 150,
        energy: 100,
        mana: 50,
        fight: {
            soco: { dano: 10, energia: -2, mana: 0 },
            chute: { dano: 5, energia: -2, mana: 0 },
            skills: [
                { dano: 25, energia: -5, mana: -6 },
                { dano: 40, energia: -6, mana: -10 }
            ],
            recuperação: { dano: 0, energia: 15, mana: 5 }
        }
    }, {
        name: "Hakon",
        image: "npc03",
        life: 80,
        energy: 100,
        mana: 20,
        fight: {
            soco: { dano: 20, energia: -2, mana: 0 },
            chute: { dano: 15, energia: -2, mana: 0 },
            skills: [
                { dano: 42, energia: -5, mana: -6 },
                { dano: 60, energia: -6, mana: -10 }
            ],
            recuperação: { dano: 0, energia: 8, mana: 5 }
        }
    }
]