const Client = require('../../lib/client');
const { expect } = require('chai');
const assert = require('assert');

describe('Request Client', async () => {
    it('Should be able to make a request', () => {
        expect(0).to.equal(1);
    });

    it('Should re-try 3 times if a request fails', () => {
        expect(0).to.equal(1);
    });
});
