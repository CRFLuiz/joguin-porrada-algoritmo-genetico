import Room from '../../controller/Room.js';
const room = new Room();

const router = server => {
    server.get('/game', (req, res) => {
        const token = room.findGame();
        return res.json({ ok: true, token });
    });

    server.post('/game/find', (req, res) => {
        const { token } = req.body;
        const enemy = room.loadsARandomMatch(token);
        const player = room.describePlayer(token);
        return res.json({ ok: true, enemy, player });
    });

    server.post('/game/battle/init', (req, res) => {
        const { token } = req.body;
        const battle = room.turnBattle(token);
        if(battle !== undefined && battle !== null){
            let response = { ok: true, playerTime: true, battle };
            return res.json(response);
        }
        return res.json({ ok: false });
	});
	
	server.post('/game/battle/attack', (req, res) => {
		const { token, action } = req.body;
		const battle = room.attack(token, action);
        if(battle !== undefined && battle !== null){
            let response = { ok: true, playerTime: true, battle };
            return res.json(response);
        }
        return res.json({ ok: false });
	});

    server.route('/game/battle/round')
        .get((req, res) => {
            room.getRound();
        })
        .post((req, res) => {
            const { token } = req.body;
        });
}

export default router;