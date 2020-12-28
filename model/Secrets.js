import fs from 'fs';
import secrets from '../secrets/secrets.js';

class Secrets{
    constructor(){}

    static getJwtKey(){
        return secrets.jwtKey;
    }
}

export default Secrets;