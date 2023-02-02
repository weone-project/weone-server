const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const categoryTypeDefs = `#GraphQL

`
const categoryResolvers = {
    Query: {

    },
    Mutation: {

    }
}

module.exports = { categoryTypeDefs, categoryResolvers }
