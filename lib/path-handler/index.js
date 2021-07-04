class Path {
    constructor(options = { apiKey: null, payload: null, region: null }) {
        const { apiKey, payload, region } = options;
        this.apiKey = apiKey;
        this.payload = payload;
        this.region = region;
        this.optionsCheck();
    }

    /* Util Methods */
    optionsCheck() {
        const { apiKey, payload, region } = this;
        if (!apiKey || !payload || !region) {
            throw new Error('Path Requires an apiKey, payload, and region in the options argument.');
        }
    }

    generatePrefix(type) { 
        const prefixs = {
            summoner: {
                NA: 'https://na1.api.riotgames.com/tft/summoner/v1/summoners/',
            }
        }
        const { region } = this;
        return prefixs[type][region];
    }
}
module.exports = Path;
