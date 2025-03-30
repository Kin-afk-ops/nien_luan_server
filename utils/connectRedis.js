const Redis = require("ioredis");

const connectRedis = () => {
  let client = new Redis(
    `rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`
  );
  return client;
};

module.exports = connectRedis;
