const Path = require('../../lib/path-handler');
const { expect } = require('chai');
const assert = require('assert');
const API_KEY = require('../../config.js');

describe('Path handler', () => {
        const options = { apiKey: API_KEY, region: 'NA', payload: { 
            accountId: 'HZRCRfoL7vf8PmW9DFGeQnZx05AFW6dNgxP1t-N3Xw', 
            summonerName: 'scarra',
            puuid: 'vy9iRyl4SENb_sop5qRwuCmHqcV_YU1OKss9E8sbnLzNjA956jwHHfMvnBCx9DdCsSD6IK-gIrAj9g',
            summonerId: 'IFg_bFm3i52CJVxBvKBuqQmmZ_SqEq52nnInd-PAtfw',
        } };
        const pathHandler = new Path(options);
    it('Should accept dynamic options', () => {
        expect(pathHandler.payload.accountId).to.equal(options.payload.accountId);
    });

    it('Should be able to generate a valid prefix by region', () => {
        expect(pathHandler.generatePrefix('summoner')).to.equal('https://na1.api.riotgames.com/tft/summoner/v1/summoners/');
    })

    it('Summoner: Should create a valid summonerByAccountId path', () => {
        const expected = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-account/HZRCRfoL7vf8PmW9DFGeQnZx05AFW6dNgxP1t-N3Xw?api_key=${API_KEY}`;
        const actual = pathHandler.summonerByAccountId();
        expect(actual).to.equal(expected);
    });

    it('Summoner: Should create a valid summonerBySummonerName path', () => {
        const expected = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/scarra?api_key=${API_KEY}`;
        const actual = pathHandler.summonerBySummonerName();
        expect(actual).to.equal(expected);
    });

    it('Summoner: Should create a valid summonerByPuuid path', () => {
        const expected = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/vy9iRyl4SENb_sop5qRwuCmHqcV_YU1OKss9E8sbnLzNjA956jwHHfMvnBCx9DdCsSD6IK-gIrAj9g?api_key=${API_KEY}`;
        const actual = pathHandler.summonerByPuuid();
        expect(actual).to.equal(expected);
    });

    it('Summoner: Should create a valid summonerBySummonerId path', () => {
        const expected = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/IFg_bFm3i52CJVxBvKBuqQmmZ_SqEq52nnInd-PAtfw?api_key=${API_KEY}`;
        const actual = pathHandler.summonerBySummonerId();
        expect(actual).to.equal(expected);
    });

    it('Match: Should create a valid matchsByPuuid path', () => {
        expect(0).to.equal(1);
    });

    it('Match: Should create a valid matchByMatchId path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoChallengers path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoMasters path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoGrandmasters path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoBySummonerId path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoByTierAndDivision path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoByLeagueId path', () => {
        expect(0).to.equal(1);
    });

    it('League: Should create a valid leagueInfoByQueueId', () => {
        expect(0).to.equal(1);
    });
});
