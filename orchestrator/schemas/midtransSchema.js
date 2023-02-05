const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const midtransTypeDefs = `#GraphQL
    type MidtransResponse {
        token: String
        redirect_url: String
    }

    type Message {
        message: String
    }

    type Mutation {
        midtransToken(orderId :ID): MidtransResponse
    }
`
const midtransResolvers = {
    Mutation: {
        midtransToken: async (_, args) => {
            try {
                const { orderId } = args
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/midtrans/' + orderId
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error midtrans schema');
                throw error
            }
        }
    }
}

module.exports = { midtransTypeDefs, midtransResolvers }
