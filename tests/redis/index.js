const Redis = require('../../lib/redis');
const { expect } = require('chai');
const assert = require('assert');

describe('Redis Cache', async () => {
    it('Should be able to store data with an expiry time', async () => {
        expect(0).to.equal(1);
    });

    it('Should be able to store data without an expiry time', async () => {
        expect(0).to.equal(1);
    });

    it('Should be able to retrieve data', async () => {
        expect(0).to.equal(1);
    });

    it('Should not be able to retrieve an expired item', async () => {
        expect(0).to.equal(1);
    });

    it('Should be able to flush the entire dataset', async () => {
        expect(0).to.equal(1);
    });
});
