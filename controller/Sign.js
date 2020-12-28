import jwt from 'jsonwebtoken';
import Secrets from '../model/Secrets.js';
class Sign{
    constructor(){}

    in(){}

    up(){
        const jwtKey = Secrets.getJwtKey();
        return jwt.sign({ sei: 'lá' }, jwtKey);
    }
}

export default Sign;