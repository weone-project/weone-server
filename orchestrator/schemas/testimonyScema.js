const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const testimonyTypeDefs = `#GraphQL
    type Product {
        id: ID
        name: String
        description: String
        imgUrl: [String]
        price: Int
        estimatedDay: Int
        rating: Float
        dpPrice: Int
        VendorId: Int
        CategoryId: Int
    }

    type Testimony{
        id:ID
        UserId:Int
        ProductId:Int
        testimony:String
        Product:Product
        User:User
        rating:Int
    }

    type User{
        id:ID
        name:String
        email:String
        phoneNumber:String
        address:String
        userImgUrl:String
    }

    input TestimonyForm {
        productId:ID
        testimony:String
        rating:Int
    }

    input EditTestimony {
        testimony:String
    }

    type Message {
        message: String
    }

    type Query {
        getTestimonies(productId:ID): [Testimony]
        user:User
        product:Product
    }

    type Mutation {
        createTestimony(form: TestimonyForm,access_token:String): Message
        updateTestimony(form: EditTestimony, id:ID,access_token:String): Message
        deleteTestimony(id: ID,access_token:String): Message
    }
`

const testimonyResolvers = {
    Query: {
        getTestimonies: async (_,args) => {
            try {
                const{productId}=args
                const cache = await redis.get('get:testimonies')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/testimonies/${productId}`,
                    })
                    await redis.set('foods', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        }
    },
    Mutation: {
        createTestimony: async (_, args) => {
            // console.log(args, '<--- this args');
            try {
                const{access_token}=args
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/testimonies',
                    data: args.form,
                    headers:{
                        access_token:access_token
                    }
                });
                // console.log(data, '<--- data boy');
                await redis.del('get:testimonies');
                return data;
            } catch (error) {
                console.log(error, '<--- error create product orchestra');
                throw error.response.data;
            }
        },

        updateTestimony: async (_, args) => {
            try {
                const { id,form,access_token } = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/testimonies/${id}`,
                    data: form,
                    headers:{
                        access_token:access_token
                    }
                })
                await redis.del('get:testimonies');
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        deleteTestimony: async (_, args) => {
            try {
                const { id,access_token } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/testimonies/' + id,
                    headers:{
                        access_token:access_token
                    }
                })
                await redis.del('get:testimonies');
                return data
            } catch (error) {
                // console.log(error, '<--- error deleteProduct orches');
                // console.log(error.response.data.message)
                throw error.response.data
            }
        },
    },

    
}

module.exports = { testimonyTypeDefs, testimonyResolvers }
