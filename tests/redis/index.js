const Redis = require('../../lib/redis');
const { expect } = require('chai');
const assert = require('assert');

describe('Redis Cache', async () => {
    const cache = new Redis();

    it('Should be able to take dynamic options', () => {
        const customOptions = {
            host: '127.0.0.1',
            port: 6379,
            keyPrefix: 'custom-',
        }
        const customCache = new Redis(customOptions);
        expect(customCache.key).to.equal(customOptions.keyPrefix);
    });

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
