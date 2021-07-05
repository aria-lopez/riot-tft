const axios = require('axios');
class Client {
    constructor(path) {
        this.path = path;
    }

    async sendRequest() {
        try {
            const { data } = await axios.get(this.path);
            return data;
        } catch(e) {
            throw new Error(e);
        }
    }
}
module.exports = Client;
