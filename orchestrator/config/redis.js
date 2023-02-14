const Redis = require('ioredis')
const redis = new Redis({
    host: "redis-12296.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 12296,
    password: "3jGjJI2YPg9zePRkSttMKwDGo9HAiT7R"
})


module.exports = redis