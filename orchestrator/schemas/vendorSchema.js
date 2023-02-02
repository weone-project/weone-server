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

    type Query {
        getVendors: [Vendor]
    }

    type Mutation {
        createVendor(form: VendorForm): Vendor
    }
`

const vendorResolvers = {
    Query: {
        getVendors: async () => {
            try {
                const cache = await redis.get('get:vendors')
                if(cache) {
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
            console.log('masukkk bs', args);
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${BASE_URL}/vendors`,
                    data: args.form,
                });
                console.log(data, '==== INI DATA');

                // await redis.del("get:vendors");
                return data;
            } catch (error) {   
                console.log(error, '<--- error createVendor orches');
                throw error;
            }
        },
    }
}

module.exports = { vendorTypeDefs, vendorResolvers }
