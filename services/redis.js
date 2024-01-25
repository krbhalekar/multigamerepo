const Redis = require("ioredis");

const redis = new Redis();

let setData = async (key, value) => {
    redis.set(key, value);
};

let getData =  async(key) => {
    let data = await redis.get(key);
    return data;
};

module.exports = {
    setData,
    getData
};