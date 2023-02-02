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
        address: String
        vendorImgUrl: String
    }

    input VendorForm {
        name: String
        email: String
        password: String
        phoneNumber: String
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
    }

    type Mutation {
        createVendor(form: VendorForm): Vendor
        deleteVendor(id: ID): Message
        loginVendor(form: LoginVendorForm): LoginResponse
        updateVendor(form: VendorForm): Message
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
                console.log(error, '<---- error getVendors schema');
                throw error
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
                console.log(error, '<--- error createVendor orches');
                throw error;
            }
        },

        loginVendor: async(_, args) => {
            try {
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + '/vendors/login',
                    data: args.form
                })

                return data
            } catch (error) {
                console.log(error, '<--- error loginVendor schema');
                throw error
            }
        },

        // update

        deleteVendor: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/vendors/' + id
                })

                return data
            } catch (error) {
                console.log(error, '<--- error deleteVendor orches');
                throw error
            }
        },
    }
}

module.exports = { vendorTypeDefs, vendorResolvers }
