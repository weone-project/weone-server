const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const productTypeDefs = `#GraphQL

`
const productResolvers = {
    Query: {

    },
    Mutation: {

    }
}

module.exports = { productTypeDefs, productResolvers }
