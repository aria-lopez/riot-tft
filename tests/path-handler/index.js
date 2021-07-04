const Path = require('../../lib/path-handler');
const { expect } = require('chai');
const assert = require('assert');

describe('Path handler', () => {
        const options = { apiKey: 1, region: 'NA', payload: { accountId: 1} };
        const pathHandler = new Path(options);
    it('Should accept dynamic options', () => {
        expect(pathHandler.payload.accountId).to.equal(options.payload.accountId);
    });

    it('Should be able to generate a valid prefix by region', () => {
        expect(pathHandler.generatePrefix('summoner')).to.equal('https://na1.api.riotgames.com/tft/summoner/v1/summoners/');
    })

    it('Summoner: Should create a valid summonerByAccountId path', () => {
        expect(0).to.equal(1);
    });

    it('Summoner: Should create a valid summonerBySummonerName path', () => {
        expect(0).to.equal(1);
    });

    it('Summoner: Should create a valid summonerByPuuid path', () => {
        expect(0).to.equal(1);
    });

    it('Summoner: Should create a valid summonerBySummonerId path', () => {
        expect(0).to.equal(1);
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
