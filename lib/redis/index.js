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
        this.keyPrefix = this.options.keyPrefix;

        this.client = redis.createClient(this.options);
        this.client.on('error', (err) => console.log(err));
    }

    async set(key, value, ttl = null) {
        try {
            const setAsync = promisify(this.client.set).bind(this.client);

            let args = [ (this.keyPrefix + key), JSON.stringify(value) ];
            if (ttl) { args.concat([ 'EX', ttl ]); }

            await setAsync(...args);
            return 'OK';
        } catch(e) {
            console.log(e);            
        }
    }
}
module.exports = Redis;
