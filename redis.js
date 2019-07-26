const redis    = require("redis");
const bluebird = require("bluebird");

const client = redis.createClient();
bluebird.promisifyAll(client);

module.exports = client;