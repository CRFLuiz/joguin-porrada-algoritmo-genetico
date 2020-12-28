import server from './server/server.js';
import router from './server/routes/router.js';

router(server);

server.listen(3000, console.log("Online"))