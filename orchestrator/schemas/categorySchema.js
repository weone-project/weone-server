const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const categoryTypeDefs = `#GraphQL
    type Category {
        name: String
    }

    type Query {
        getCategories: [Category]
    }
`
const categoryResolvers = {
    Query: {
        getCategories: async () => {
            console.log('get categories masuk ---');
            try {

                return 'asas'
            } catch (error) {
                console.log(error, '<--- error getMovies resolvers');
                throw error
            }
        },
    },
    // Mutation: {

    // }
}

module.exports = { categoryTypeDefs, categoryResolvers }
