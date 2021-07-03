class Path {
    constructor(options = { type: null, payload: null }) {
        const { type, payload } = options;
        this.type = type;
        this.payload = payload;
    }
}
module.exports = Path;
