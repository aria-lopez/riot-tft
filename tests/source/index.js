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
        tier: 'DIAMOND',
        division: 'I',
        leagueId: 'e1fe397d-2a53-4509-a079-e5d8066f7ddb',
        queueId: 'RANKED_TFT_TURBO',
        matchId: 'NA1_3965501154',
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
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/IFg_bFm3i52CJVxBvKBuqQmmZ_SqEq52nnInd-PAtfw?api_key=${API_KEY}`);
        const actual = await tft.getSummonerBySummonerId();
        assert.deepStrictEqual(actual, data);
    });

    it('Match: Should be able to query matchIdsByPuuid', async () => {
        const { data } = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/vy9iRyl4SENb_sop5qRwuCmHqcV_YU1OKss9E8sbnLzNjA956jwHHfMvnBCx9DdCsSD6IK-gIrAj9g/ids?count=20&api_key=${API_KEY}`);
        const actual = await tft.getMatchIdsByPuuid();
        assert.deepStrictEqual(actual, data); 
    });

    it('Match: Should be able to query matchByMatchId', async () => {
        const { data } = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/NA1_3965501154?api_key=${API_KEY}`);
        const actual = await tft.getMatchByMatchId();
        assert.deepStrictEqual(actual, data);
    });

    /* The following tests are not as accurate as I would like. (The League Routes)
     * The Riot API for League information is ever-changing as it is highly volatile.
     * This being said these test simply make sure the data is the correct shape, however the contents may be different.
     */

    const shallowCompare = (actual) => {
        const expectedShape = { 
            entries: [ { 
                freshBlood: false, 
                hotStreak: false, 
                inactive: false,
                leaguePoints: 1,
                losses: 1,
                rank: 'String',
                summonerId: 'String',
                summonerName: 'String',
                veteran: false,
                wins: 1,
            } ], 
        };
        if (!actual?.entries[0]) return false;
        for (key in actual.entries[0]) {
            if (typeof actual.entries[0][key] !== typeof expectedShape.entries[0][key]) {
                return false;
            }
        }
        return true;
    }

    const shallowCompareForLeagueId = (actual) => {
        const expectedShape = {
            tier: 'String',
            leagueId: 'String',
            queue: 'String',
            name: 'String',
            entries: [ {
                    summonerId: 'String',
                    summonerName: 'String',
                    leaguePoints: 1,
                    rank: 'String',
                    wins: 1,
                    losses: 1,
                    veteran: false,
                    inactive: false,
                    freshBlood: false,
                    hotStreak: false,
                } ],
        };
        for (key in actual) {
            if (key === 'entries') {
                for (subKey in actual[key]) {
                    if (typeof actual[key][0][subKey] !== typeof expectedShape[key][0][subKey]) {
                        return false;
                    }
                }
            }

            if (typeof actual[key] !== typeof expectedShape[key]) {
                return false;
            }
        }
        return true;
    }

    it('League: Should be able to query leagueInfoChallengers', async () => {
        const actual = await tft.getLeagueInfoChallengers();
        expect(shallowCompare(actual)).to.equal(true);
    });

    it('League: Should be able to query leagueInfoMasters', async () => {
        const actual = await tft.getLeagueInfoMasters();
        expect(shallowCompare(actual)).to.equal(true);
    });

    it('League Should be able to query leagueInfoGrandmasters', async () => {
        const actual = await tft.getLeagueInfoGrandmasters();
        expect(shallowCompare(actual)).to.equal(true);
    });

    it('League: Should be able to query leagueInfoBySummonerId', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/IFg_bFm3i52CJVxBvKBuqQmmZ_SqEq52nnInd-PAtfw?api_key=${API_KEY}`);
        const actual = await tft.getLeagueInfoBySummonerId();
        assert.deepStrictEqual(actual, data);
    });

    it('League: Should be able to query leagueInfoByTierAndDivision', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/DIAMOND/I?page=1&api_key=${API_KEY}`);
        const actual = await tft.getLeagueInfoByTierAndDivision();
        assert.deepStrictEqual(actual, data);
    });

    it('League: Should be able to query leagueInfoByLeagueId', async () => {
        const actual = await tft.getLeagueInfoByLeagueId();
        expect(shallowCompareForLeagueId(actual)).to.equal(true);
    });

    it('League: Should be able to query leagueInfoByQueueId', async () => {
        const { data } = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/rated-ladders/RANKED_TFT_TURBO/top?api_key=${API_KEY}`);
        const actual = await tft.getLeagueInfoByQueueId();
        assert.deepStrictEqual(actual, data);
    });
});
