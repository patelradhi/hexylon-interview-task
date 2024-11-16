const ioredis = require("ioredis");

const redisConfig = require("../../config");

class Redis {
  constructor() {
    this.cache = new ioredis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password
    });
  }

  async get(key) {
    return await this.cache.get(key);
  }
  async set(key, value, ttl = 60) {
    await this.cache.set(key, value);
    await this.cache.expire(key, ttl);
  }
  async fetch(key, callback, ttl = 60) {
    let value = this.cache.get(key);
    if (!value) {
      value = await callback();
    }
    await this.cache.set(key, value);
    await this.cache.expire(key, ttl);
    return value;
  }
}

module.exports = Redis;
