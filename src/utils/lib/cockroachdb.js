const pg = require('pg');

class CockroachDb {
    constructor(options) {
        this.pool = new pg.Pool({
            host: options.host,
            port: options.port,
            user: options.user,
            max: options.maxPoolSize,
            connectionTimeoutMillis: 2000,
            idleTimeoutMillis: 30000,
        });
    }

    async query(rawQuery, values) {
        return await this.pool.query(rawQuery, values); 
    }
}

module.exports = CockroachDb;