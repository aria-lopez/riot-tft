require('dotenv').config();
const Redis = require('../redis');
const Path = require('../path-handler');
const Client = require('../client');

class RiotTFT {
    constructor(region, payload, API_KEY, useRedis, redisConfig) {
        this.region = region;
        this.payload = payload || {};
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

    addToPayload(items) {
        const newPayload = {...this.payload};
        for (key in items) {
            newPayload[key] = items[key];
        }
        this.payload = newPayload;
    }

    /* Summoner Routes */
    async getSummonerByAccountId() {
        try {
            if (!this.payload?.accountId) { throw new Error('getSummonerByAccountId requires an accountId in the payload.'); };
            const key = `summonerByAccountId-${this.payload.accountId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
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
                if (cached) return cached;
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
                if (cached) return cached;
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
                if (cached) return cached;
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

    /* Match Routes */
    async getMatchIdsByPuuid() {
        try {
            if (!this.payload?.puuid) { throw new Error('getMatchIdsByPuuid requires an puuid in the payload.'); };
            const key = `matchIdsByPuuid-${this.payload.puuid}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }
            
            const client = new Client(this.pathHandler.matchIdsByPuuid());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getMatchByMatchId() {
        try {
            if (!this.payload?.matchId) { throw new Error('getMatchByMatchId requires a matchId in the payload'); };
            const key = `matchByMatchId-${this.payload.matchId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.matchByMatchId());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    /* League Routes */
    async getLeagueInfoChallengers() {
        try {
            const key = `leagueInfoChallengers`;
            
            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.leagueInfoChallengers());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getLeagueInfoMasters() {
        try {
            const key = `leagueInfoMasters`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.leagueInfoMasters());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getLeagueInfoGrandmasters() {
        try {
            const key = `leagueInfoGrandmasters`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.leagueInfoGrandmasters());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getLeagueInfoBySummonerId() {
        try {
            if (!this.payload?.summonerId) { throw new Error('getLeagueInfoBySummonerId requires an summonerId in the payload.'); };
            const key = `leagueInfoBySummonerId-${this.payload.summonerId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.leagueInfoBySummonerId());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getLeagueInfoByTierAndDivision() {
        try {
            if (!this.payload?.tier || !this.payload?.division) { throw new Error('getLeagueInfoByTierAndDivision requires an tier and division in the payload.'); };
            const key = `leagueInfoByTierAndDivision-${this.payload.tier}-${this.payload.division}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.leagueInfoByTierAndDivision());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getLeagueInfoByLeagueId() {
        try {
            if (!this.payload?.leagueId) { throw new Error('getLeagueInfoByLeagueId requires an leagueId in the payload.'); };
            const key = `leagueInfoByLeagueId-${this.payload.leagueId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }
            
            const client = new Client(this.pathHandler.leagueInfoByLeagueId());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    async getLeagueInfoByQueueId() {
        try {
            if (!this.payload?.queueId) { throw new Error('getLeagueInfoByQueueId requires an queueId in the payload.'); };
            const key = `leagueInfoByQueueId-${this.payload.queueId}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            const client = new Client(this.pathHandler.leagueInfoByQueueId());
            const data = await client.sendRequest();

            if (this.cache) {
                await this.cache.set(key, data, this.ttl);
            }

            return data;
        } catch(e) {
            throw new Error(e);
        }
    }

    /* Custom Methods: Not based of official API */
    async getSummonerAndLeagueInfoBySummonerName() {
        try {
            if (!this.payload?.summonerName) { throw new Error('getSummonerAndLeagueInfoBySummonerName requires a summonerName in the payload'); };
            const key = `allInfoBySummonerName-${this.payload.summonerName}`;

            if (this.cache) {
                const cached = await this.cache.get(key);
                if (cached) return cached;
            }

            let blob = {};

            const summonerNameData = await this.getSummonerBySummonerName();
            const { id, accountId, puuid } = summonerNameData;

            const payloadInfo = { summonerId: id, accountId, puuid };
            this.addToPayload(payloadInfo);

            blob = summonerNameData;

            let leagueInfoData = await this.getLeagueInfoBySummonerId();
            leagueInfoData = leagueInfoData[0];

            const { leagueId } = leagueInfoData;
            this.addToPayload({ leagueId });

            blob = {...blob, ...leagueInfoData};

            if (this.cache) {
                await this.cache.set(key, blob, this.ttl);
            }
            return blob;
        } catch(e) {
            throw new Error(e);
        }
    }
}
module.exports = RiotTFT;
