const { MongoClient } = require('mongodb');

class MongoDb {
    constructor(url) {
        this.client = new MongoClient(url);
    }

    async init() {
        await this.client.connect();
    }
    async database(dbName) {
        return this.client.db(dbName);
    }
}

module.exports = MongoDb