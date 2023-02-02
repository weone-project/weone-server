const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const productTypeDefs = `#GraphQL
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

    input ProductForm {
        name: String
        description: String
        imgUrl: String
        price: Int
        estimatedDay: Int
        dpPrice: Int
        VendorId: Int
        CategoryId: Int
    }

    type Message {
        message: String
    }

    type Query {
        getProducts: [Product]
    }

    type Mutation {
        createProduct(form: ProductForm): Message
        deleteProduct(id: ID): Message
    }
`

const productResolvers = {
    Query: {
        getProducts: async () => {
            try {
                const cache = await redis.get('get:products')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + '/products'
                    })

                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error
            }
        }
    },
    Mutation: {
        createProduct: async (_, args) => {
            console.log(args, '<--- this args');
            try {
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/products',
                    data: args.form,
                });

                console.log(data, '<--- data boy');

                await redis.del('get:products');
                return data;
            } catch (error) {
                console.log(error, '<--- error create product orches');
                throw error;
            }
        },

        // updateProduct: async (_, args) => {
        //     console.log(args, '<---- args product');
        //     try {
        //         const { id } = args
        //         const { data } = await axios({
        //             method: 'put',
        //             url: `${baseUrl}/items/${id}`,
        //             data: args.form,
        //         })

        //         console.log(data, '<--- data boy');

        //         await redis.del("get:items");
        //         return data;
        //     } catch (err) {
        //         throw err;
        //     }
        // },

        deleteProduct: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/products/' + id
                })
    
                return data
            } catch (error) {
                console.log(error, '<--- error deleteProduct orches');
                throw error
            }
        },
    },

    
}

module.exports = { productTypeDefs, productResolvers }