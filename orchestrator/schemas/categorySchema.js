const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const categoryTypeDefs = `#GraphQL
    type Category {
        id: ID
        name: String
    }

    input CategoryForm {
        name: String
    }

    type Message {
        message: String
    }

    type Query {
        getCategories: [Category]
    }

    type Mutation {
        createCategory(form: CategoryForm): Message
        deleteCategory(id:ID): Message
    }
`
const categoryResolvers = {
    Query: {
        getCategories: async () => {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${BASE_URL}/categories`
                })
                return data

            } catch (error) {
                console.log(error, '<---- error getCategory resolvers');
                throw error.response.data.response.data
            }
        },
    },
    Mutation: {
        createCategory: async (_, args) => {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${BASE_URL}/categories`,
                    data: args.form,
                });

                // await redis.del("get:categories");
                return data;
            } catch (error) {
                console.log(error, '<--- error createCategory orches');
                throw error.response.data;
            }
        },

        deleteCategory: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'delete',
                    url: `${BASE_URL}/categories/${id}`
                })

                return data
            } catch (error) {
                console.log(error, '<--- error deleteCategory orches');
                throw error.response.data
            }
        },
    }
}

module.exports = { categoryTypeDefs, categoryResolvers }
