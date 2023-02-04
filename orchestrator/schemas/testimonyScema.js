const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const testimonyTypeDefs = `#GraphQL
    type Product {
        id: ID
        name: String
        description: String
        imgUrl: String
        price: Int
        estimatedDay: Int
        rating: Int
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
        createTestimony(form: TestimonyForm): Message
        updateTestimony(form: EditTestimony, id:ID): Message
        deleteTestimony(id: ID): Message
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
                        url: BASE_URL + `/testimonies/${productId}`
                    })
                    await redis.set('foods', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error
            }
        }
    },
    Mutation: {
        createTestimony: async (_, args) => {
            // console.log(args, '<--- this args');
            try {
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/testimonies',
                    data: args.form,
                });
                // console.log(data, '<--- data boy');
                await redis.del('get:testimonies');
                return data;
            } catch (error) {
                console.log(error, '<--- error create product orchestra');
                throw error;
            }
        },

        updateTestimony: async (_, args) => {
            try {
                const { id,form } = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/testimonies/${id}`,
                    data: form,
                })
                await redis.del('get:testimonies');
                return data;
            } catch (err) {
                throw err;
            }
        },

        deleteTestimony: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/testimonies/' + id
                })
                await redis.del('get:testimonies');
                return data
            } catch (error) {
                console.log(error, '<--- error deleteProduct orches');
                throw error
            }
        },
    },

    
}

module.exports = { testimonyTypeDefs, testimonyResolvers }
