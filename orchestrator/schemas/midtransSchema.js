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

    input OrderForMidtrans{
        UserId:Int
        productId:Int
        orderId: Int
        reservationDate:String
        paymentStatus:String
        fullPayment:Int
        downPayment:Int
        quantity:Int
        notes:String 
    }

    type Mutation {
        midtransToken(form: OrderForMidtrans,status:String,access_token:String): MidtransResponse
    }
`
const midtransResolvers = {
    Mutation: {
        midtransToken: async (_, args) => {
            try {
                const { status,access_token,form } = args
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/midtrans/' + status,
                    headers:{
                        access_token:access_token
                    },
                    data:form
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error midtrans schema');
                throw error.response.data
            }
        }


    }
}

module.exports = { midtransTypeDefs, midtransResolvers }
