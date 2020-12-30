export default [
    {
        name: "Aleifr",
        image: "chars/viking01",
        life: 100,
        energy: 75,
        mana: 30,
        fight: {
            punch: [{ damage: 15, energy: -2, mana: 0, name: "PUNCH 1" }],
            kick: [{ damage: 10, energy: -2, mana: 0, name: "KICK 1" }],
            skills: [
                { damage: 35, energy: -5, mana: -6, name: "SKILL A" },
                { damage: 50, energy: -6, mana: -10, name: "SKILL B" }
            ],
            recuperação: [{ damage: 0, energy: 10, mana: 5, name: "HEALTHY A" }]
        }
    }, {
        name: "Einar",
        image: "chars/viking02",
        life: 150,
        energy: 100,
        mana: 50,
        fight: {
            punch: [{ damage: 10, energy: -2, mana: 0, name: "PUNCH 1" }],
            kick: [{ damage: 5, energy: -2, mana: 0, name: "KICK 1" }],
            skills: [
                { damage: 25, energy: -5, mana: -6, name: "SKILL A" },
                { damage: 40, energy: -6, mana: -10, name: "SKILL B" }
            ],
            recuperação: [{ damage: 0, energy: 15, mana: 5, name: "HEALTHY A" }]
        }
    }, {
        name: "Hakon",
        image: "chars/viking03",
        life: 80,
        energy: 100,
        mana: 20,
        fight: {
            punch: [{ damage: 20, energy: -2, mana: 0, name: "PUNCH 1" }],
            kick: [{ damage: 15, energy: -2, mana: 0, name: "KICK 1" }],
            skills: [
                { damage: 42, energy: -5, mana: -6, name: "SKILL A" },
                { damage: 60, energy: -6, mana: -10, name: "SKILL B" }
            ],
            recuperação: [{ damage: 0, energy: 8, mana: 5, name: "HEALTHY A" }]
        }
    }
]