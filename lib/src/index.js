require('dotenv').config();
const Redis = require('../redis');
const Path = require('../path-handler');
const Client = require('../client');

class RiotTFT {
    constructor(region, payload, API_KEY, useRedis, redisConfig) {
        this.region = region;
        this.payload = payload;
        this.API_KEY = API_KEY || process.env.API_KEY; 
        if (useRedis) {
            this.cache = new Redis(redisConfig.options);
            this.ttl = redisConfig.ttl || 600;
        }
        this.checkOptions();
    }
    
    checkOptions() {
        const { region, payload, API_KEY } = this;
        if (!region, !payload, !API_KEY) { throw new Error('Tool requires a region, payload, and API_KEY in the constructor'); };
    }
}
module.exports = RiotTFT;
