const RiotTFT = require('../../lib/src');
const { expect } = require('chai');
const assert = require('assert');
const API_KEY = require('../../config.js');

describe('RiotTFT query tool', async () => {
    const region = 'NA';
    const payload = {
        summonerName: 'scarra',
    };
    const useRedis = true;
    const redisConfig = { options: false, ttl: 1000 };
    const tft = new RiotTFT(region, payload, API_KEY, useRedis, redisConfig);
    it('Should be able to accept dynamic options', () => {
        expect(tft.ttl).to.equal(1000);
    });
});
