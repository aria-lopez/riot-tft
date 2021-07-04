class Path {
    constructor(options = { apiKey: null, payload: null, region: null }) {
        const { apiKey, payload, region } = options;
        this.apiKey = apiKey;
        this.payload = payload;
        this.region = region;
        this.optionsCheck();
    }

    /* Util Methods */
    optionsCheck() {
        const { apiKey, payload, region } = this;
        if (!apiKey || !payload || !region) {
            throw new Error('Path Requires an apiKey, payload, and region in the options argument.');
        }
    }

    generatePrefix(type) { 
        const prefixs = {
            summoner: {
                NA: 'https://na1.api.riotgames.com/tft/summoner/v1/summoners/',
            },
            match: {
                NA: 'https://americas.api.riotgames.com/tft/match/v1/matches/',
            },
            league: {
                NA: 'https://na1.api.riotgames.com/tft/league/v1/',
            }
        }
        const { region } = this;
        return prefixs[type][region];
    }

    summonerByAccountId() {
        const { payload, apiKey } = this;
        if (!payload.accountId) { throw new Error('Payload requires an accountId'); };
        const prefix = this.generatePrefix('summoner');
        const path = `${prefix}by-account/${payload.accountId}?api_key=${apiKey}`;
        return path;
    }

    summonerBySummonerName() {
        const { payload, apiKey } = this;
        if (!payload.summonerName) { throw new Error('Payload requires an summonerName'); };
        const prefix = this.generatePrefix('summoner');
        const path = `${prefix}by-name/${payload.summonerName}?api_key=${apiKey}`;
        return path;
    }

    summonerByPuuid() {
        const { payload, apiKey } = this;
        if (!payload.puuid) { throw new Error('Payload requires an puuid'); };
        const prefix = this.generatePrefix('summoner');
        const path = `${prefix}by-puuid/${payload.puuid}?api_key=${apiKey}`;
        return path;
    }

    summonerBySummonerId() {
        const { payload, apiKey } = this;
        if (!payload.summonerId) { throw new Error('Payload requires an summonerId'); };
        const prefix = this.generatePrefix('summoner');
        const path = `${prefix}${payload.summonerId}?api_key=${apiKey}`;
        return path;
    }

    matchIdsByPuuid() {
        const { payload, apiKey } = this;
        if (!payload.puuid) { throw new Error('Payload requires a puuid'); };
        const count = payload?.matchCount || 20;
        const prefix = this.generatePrefix('match');
        const path = `${prefix}by-puuid/${payload.puuid}/ids?count=${count}&api_key=${apiKey}`;
        return path;
    }

    matchByMatchId() {
        const { payload, apiKey } = this;
        if (!payload.matchId) { throw new Error('Payload requires a matchId'); };
        const prefix = this.generatePrefix('match');
        const path = `${prefix}${payload.matchId}?api_key=${apiKey}`;
        return path;
    }

    leagueInfoChallengers() {
        const { apiKey } = this;
        const prefix = this.generatePrefix('league');
        const path = `${prefix}challenger?api_key=${apiKey}`;
        return path;
    }

    leagueInfoMasters() {
        const { apiKey } = this;
        const prefix = this.generatePrefix('league');
        const path = `${prefix}master?api_key=${apiKey}`;
        return path;
    }

    leagueInfoGrandmasters() {
        const { apiKey } = this;
        const prefix = this.generatePrefix('league');
        const path = `${prefix}grandmaster?api_key=${apiKey}`;
        return path;
    }

    leagueInfoBySummonerId() {
        const { payload, apiKey } = this;
        if (!payload.summonerId) { throw new Error('Payload requires a summonerId'); };
        const prefix = this.generatePrefix('league');
        const path = `${prefix}entries/by-summoner/${payload.summonerId}?api_key=${apiKey}`;
        return path;
    }

    leagueInfoByTierAndDivision() {
        const { payload, apiKey } = this;
        if (!payload.tier || !payload.division) { throw new Error('Payload requires a tier and division'); };
        const prefix = this.generatePrefix('league');
        const page = payload?.tierAndDivisionPage || 1;
        const path = `${prefix}entries/${payload.tier}/${payload.division}?page=${page}&api_key=${apiKey}`;
        return path;
    }

    leagueInfoByLeagueId() {
        const { payload, apiKey } = this;
        if (!payload.leagueId) { throw new Error('Payload requires a leagueId'); };
        const prefix = this.generatePrefix('league');
        const path = `${prefix}leagues/${payload.leagueId}?api_key=${apiKey}`;
        return path;
    }

    leagueInfoByQueueId() {
        const { payload, apiKey } = this;
        if (!payload.queueId) { throw new Error('Payload requires a queueId'); };
        const prefix = this.generatePrefix('league');
        const path = `${prefix}rated-ladders/${payload.queueId}/top?api_key=${apiKey}`;
        return path;
    }
}
module.exports = Path;
