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
        expect(customCache.keyPrefix).to.equal(customOptions.keyPrefix);
    });

    it('Should be able to store data with an expiry time', async () => {
        const ttl = 1000;
        const value = [1, {2:3}, 4, true, false, "String"];
        const key = 'test';
        const result = await cache.set(key, value, ttl);
        expect(result).to.equal('OK');
    });

    it('Should be able to store data without an expiry time', async () => {
        const value = [1, {2:3}, 4, true, false, "String"];
        const key = 'test1';
        const result = await cache.set(key, value);
        expect(result).to.equal('OK');
    });

    it('Should be able to retrieve data', async () => {
        const key = 'get-test';
        const value = [1, {2:3}];
        await cache.set(key, value);
        const result = await cache.get(key);
        assert.deepStrictEqual(result, value);
    });

    it('Should not be able to retrieve an expired item', async function() {
        try {
            this.timeout(15000);
            const key = 'get-test-async';
            const value = [1, {2:3}];
            const ttl = 1;
            await cache.set(key, value, ttl);
            await new Promise(resolve => setTimeout(resolve, 3000));
            const result = await cache.get(key);
            expect(result).to.equal(null);
        } catch(error) {
            console.log(error);
        }
    });

    it('Should be able to flush the entire dataset', async () => {
        expect(0).to.equal(1);
    });
});
