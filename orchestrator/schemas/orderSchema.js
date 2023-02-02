const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const orderTypeDefs = `#GraphQL

`
const orderResolvers = {
    Query: {

    },
    Mutation: {

    }
}

module.exports = { orderTypeDefs, orderResolvers }
