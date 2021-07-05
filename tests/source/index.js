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
});
