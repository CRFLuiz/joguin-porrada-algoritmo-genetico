// INITIALIZERS:
const _g = new Game();
_g.init()
	.then(() => _g.startGame())
	.then(() => _g.loadView())
    .then(() => _g.loadStats())
    .then(() => _g.initializeVarGame())
    
	.then(debugResponse => console.log(debugResponse))
    .catch(debugError => console.log(debugError));