const RiotTFT = require('../../lib/src');
const { expect } = require('chai');
const assert = require('assert');
const API_KEY = require('../../config.js');
const axios = require('axios');

describe('RiotTFT query tool', () => {
    const region = 'NA';
    const payload = {
        summonerName: 'scarra',
        accountId: 'HZRCRfoL7vf8PmW9DFGeQnZx05AFW6dNgxP1t-N3Xw',
        puuid: 'vy9iRyl4SENb_sop5qRwuCmHqcV_YU1OKss9E8sbnLzNjA956jwHHfMvnBCx9DdCsSD6IK-gIrAj9g',
        summonerId: 'IFg_bFm3i52CJVxBvKBuqQmmZ_SqEq52nnInd-PAtfw',
    };
    const useRedis = true;
    const redisConfig = { options: false, ttl: 10 };
    const tft = new RiotTFT(region, payload, API_KEY, useRedis, redisConfig);
    it('Should be able to accept dynamic options', () => {
        expect(tft.ttl).to.equal(10);
    });

    it('Summoner: Should be able to query summonerByAccountId', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/IFg_bFm3i52CJVxBvKBuqQmmZ_SqEq52nnInd-PAtfw?api_key=${API_KEY}`);
        const actual = await tft.getSummonerByAccountId();
        assert.deepStrictEqual(actual, data);
    });

    it('Summoner: Should be able to query summonerBySummonerName', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/scarra?api_key=${API_KEY}`);
        const actual = await tft.getSummonerBySummonerName();
        assert.deepStrictEqual(actual, data);
    });

    it('Summoner: Should be able to query summonerByPuuid', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/vy9iRyl4SENb_sop5qRwuCmHqcV_YU1OKss9E8sbnLzNjA956jwHHfMvnBCx9DdCsSD6IK-gIrAj9g?api_key=${API_KEY}`);
        const actual = await tft.getSummonerByPuuid();
        assert.deepStrictEqual(actual, data);
    });

    it('Summoner: Should be able to query summonerBySummonerId', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/scarra?api_key=${API_KEY}`);
        const actual = await tft.getSummonerBySummonerId();
        assert.deepStrictEqual(actual, data);
    });

    it('Match: Should be able to query matchIdsByPuuid', async () => {
        const { data } = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/vy9iRyl4SENb_sop5qRwuCmHqcV_YU1OKss9E8sbnLzNjA956jwHHfMvnBCx9DdCsSD6IK-gIrAj9g/ids?count=20&api_key=${API_KEY}`);
        const actual = await tft.getMatchIdsByPuuid();
        assert.deepStrictEqual(actual, data); 
    })
});
