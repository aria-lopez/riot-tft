const Client = require('../../lib/client');
const { expect } = require('chai');
const assert = require('assert');

describe('Request Client', async () => {
    it('Should be able to make a request', async () => {
        const path = 'https://jsonplaceholder.typicode.com/todos/1';
        const client = new Client(path);
        const result = await client.sendRequest();
        const expected = { userId: 1, id: 1, title: 'delectus aut autem', completed: false };
        assert.deepStrictEqual(result, expected);
    });
});
