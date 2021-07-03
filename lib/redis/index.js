const redis = require('redis');
const { promisify } = require('util');
const defaultOptions = {
    host: '127.0.0.1',
    port: '6379',
    keyPrefix: 'tft-',
};

class Redis {
    constructor(options = false) {
        this.options = options || defaultOptions;
        this.key = this.options.keyPrefix;
    }
}
module.exports = Redis;
