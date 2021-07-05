require('dotenv').config();
const Redis = require('../redis');
const Path = require('../path-handler');
const Client = require('../client');

class RiotTFT {
    constructor(region, payload, API_KEY, useRedis, redisConfig) {
        this.region = region;
        this.payload = payload;
        this.API_KEY = API_KEY || process.env.API_KEY; 
        this.cache = null;
        this.ttl = null;
        if (useRedis) {
            this.cache = new Redis(redisConfig.options);
            this.ttl = redisConfig.ttl || 300; /* This would cache for 5mins by default */
        }
        this.pathHandler = this.generatePathHandler();
    }

    /* Util methods */
    generatePathHandler() {
        if (!this.API_KEY || !this.region || !this.payload) {
            throw new Error('RiotTFT requires an API_KEY, a region, and a payload');
        }
        return new Path({ 
            apiKey: this.API_KEY,
            payload: this.payload,
            region: this.region,
        });
    }

    async flushCache() {
        try {
            if (!this.cache) { throw new Error('This method requires redis to be enabled'); };
            await this.cache.flush();
            return 'OK';
        } catch(e) {
            throw new Error(e);
        }
    }

    /* Summoner Routes */
    async getSummonerByAccountId() {
        try {
            if (!this.payload?.accountId) { throw new Error('getSummonerByAccountId requires an accountId in the payload.'); };
            const key = `summonerByAccountId-${this.payload.accountId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) { return cached };
            }

            const client = new Client(this.pathHandler.summonerByAccountId());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getSummonerBySummonerName() {
        try {
            if (!this.payload?.summonerName) { throw new Error('getSummonerBySummonerName requires an summonerName in the payload.'); };
            const key = `summonerBySummonerName-${this.payload.summonerName}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) { return cached };
            }

            const client = new Client(this.pathHandler.summonerBySummonerName());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getSummonerByPuuid() {
        try {
            if (!this.payload?.puuid) { throw new Error('getSummonerByPuuid requires an puuid in the payload'); };
            const key = `summonerByPuuid-${this.payload.puuid}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) { return cached };
            }

            const client = new Client(this.pathHandler.summonerByPuuid());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getSummonerBySummonerId() {
        try {
            if (!this.payload?.summonerId) { throw new Error('getSummonerBySummonerId requires an summonerId in the payload'); };
            const key = `summonerBySummonerId-${this.payload.summonerId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) { return cached };
            }

            const client = new Client(this.pathHandler.summonerBySummonerId());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }
}
module.exports = RiotTFT;
