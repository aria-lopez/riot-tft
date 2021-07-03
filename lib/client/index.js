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
            console.log(e);
        }
    }
}
module.exports = Client;
