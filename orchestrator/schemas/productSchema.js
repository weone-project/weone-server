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
        status: String
        VendorId: Int
        CategoryId: Int
        createdAt: String
        updatedAt: String
        Category: Category
        Vendor: Vendor
    }

    type Category {
        id: ID
        name: String
    }

    type Vendor {
        id: ID
        name: String
        email: String
        password: String
        phoneNumber: String
        city: String
        province: String
        address: String
        vendorImgUrl: String
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
        getProducts(access_token: String): [Product]
        getProductActive: [Product]
        getProductById(id: ID): Product
    }

    type Mutation {
        createProduct(form: ProductForm): Message
        updateProduct(form: ProductForm, id:ID): Message
        deleteProduct(id: ID): Message
    }
`

const productResolvers = {
    Query: {
        // GET PRODUCT SEMUA STATUS, BUAT SI VENDOR
        getProducts: async (_, args) => {
            try {
                const { access_token } = args
                const cache = await redis.get('get:products')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + '/products',
                        headers: {
                            access_token: access_token
                        }
                    })

                    return data
                }
            } catch (error) {
                // console.log(error, '<--- error getProducts schema');
                throw error
            }
        },

        getProductActive: async () => {
            try {
                const cache = await redis.get('get:products')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + '/products/active',
                    })

                    console.log(data, '<===== datahere');
                    return data
                }
            } catch (error) {
                // console.log(error, '<--- error getProducts schema');
                throw error
            }
        },

        getProductById: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'get',
                    url: BASE_URL + '/products/' + id
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error getVendorsById schema');
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
                // console.log(error, '<--- error create product orchestra');
                throw error;
            }
        },

        updateProduct: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'put',
                    url: `${BASE_URL}/products/${id}`,
                    data: args.form,
                })

                await redis.del('get:products');
                return data;
            } catch (err) {
                throw err;
            }
        },

        deleteProduct: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/products/' + id
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error deleteProduct orches');
                throw error
            }
        },
    },


}

module.exports = { productTypeDefs, productResolvers }
