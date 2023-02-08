const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const vendorTypeDefs = `#GraphQL
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

    input VendorForm {
        name: String
        email: String
        password: String
        phoneNumber: String
        city: String
        province: String
        address: String
        vendorImgUrl: String
    }

    input UpdateVendorProductForm {
        status: String
    }

    input UpdateVendorForm {
        name: String,
        phoneNumber: String
        city: String
        province: String
        address: String
        vendorImgUrl: String
    }
    
    input LoginVendorForm {
        email: String
        password: String
    }

    type LoginResponse {
        id: ID
        name: String
        email: String
        access_token: String
    }

    type Query {
        getVendors: [Vendor]
        getVendorsById(id: ID): Vendor 
    }

    type Mutation {
        createVendor(form: VendorForm): Vendor
        deleteVendor(id: ID): Message
        loginVendor(form: LoginVendorForm): LoginResponse
        updateVendorProduct(form: UpdateVendorProductForm, productId: ID, access_token: String): Message
        updateVendor(form: UpdateVendorForm, access_token: String): Message
    }
`

const vendorResolvers = {
    Query: {
        getVendors: async () => {
            try {
                const cache = await redis.get('get:vendors')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + '/vendors'
                    })


                    await redis.set('get:vendors', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                // console.log(error, '<---- error getVendors schema');
                throw error.response.data
            }
        },

        getVendorsById: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'get',
                    url: BASE_URL + '/vendors/' + id
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error getVendorsById schema');
                throw error.response.data
            }
        }
    },
    Mutation: {
        createVendor: async (_, args) => {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${BASE_URL}/vendors/register`,
                    data: args.form,
                });

                await redis.del("get:vendors");
                return data;
            } catch (error) {
                // console.log(error, '<--- error createVendor orches');
                throw error.response.data;
            }
        },

        loginVendor: async (_, args) => {
            try {
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/vendors/login',
                    data: args.form
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error loginVendor schema');
                throw error.response.data
            }
        },

        updateVendor: async (_, args) => {
            try {
                // const { id } = args
                const { access_token } = args
                const { data } = await axios({
                    method: 'put',
                    url: `${BASE_URL}/vendors`,
                    headers: {
                        access_token: access_token
                    },
                    data: args.form,
                })

                await redis.del('get:vendors');
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        updateVendorProduct: async (_, args) => {
            try {
                // const { id } = args
                const { access_token, productId } = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/vendors/${productId}`,
                    headers: {
                        access_token: access_token
                    },
                    data: args.form,
                })

                // await redis.del('get:products');
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        deleteVendor: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/vendors/' + id
                })

                return data
            } catch (error) {
                // console.log(error, '<--- error deleteVendor orches');
                throw error.response.data
            }
        },
    }
}

module.exports = { vendorTypeDefs, vendorResolvers }
