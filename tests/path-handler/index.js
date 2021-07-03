const Path = require('../../lib/path-handler');
const { expect } = require('chai');
const assert = require('assert');

describe('Path handler', () => {
    it('Should accept dynamic options', () => {
        expect(0).to.equal(1);
    });

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
