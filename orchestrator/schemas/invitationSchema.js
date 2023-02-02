const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const invitationTypeDefs = `#GraphQL

`
const invitationResolvers = {
    Query: {

    },
    Mutation: {

    }
}

module.exports = { invitationTypeDefs, invitationResolvers }
