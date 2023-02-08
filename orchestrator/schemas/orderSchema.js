const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const orderTypeDefs = `#GraphQL
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
    Category:Category
}

type Category {
    id: ID
    name: String
}

type User{
    id: ID
    name: String
    email: String
    phoneNumber: String
    address: String
    userImgUrl: String
}

type Vendor {
    id: ID
    name: String
    email: String
    phoneNumber: String
    address: String
    vendorImgUrl: String
}

type UserOrder{
    id:ID
    UserId:ID
    ProductId:ID
    VendorId:ID
    reservationDate:String
    paymentStatus:String
    fullPayment: Int
    downPayment:Int
    quantity:Int
    notes:String
    rescheduleStatus:String
    rescheduleDate:String
    Product:Product
    Vendor:Vendor
    User:User
    createdAt:String
    updatedAt:String

}

type VendorOrder{
    id:ID
    UserId:ID
    ProductId:ID
    VendorId:ID
    reservationDate:String
    paymentStatus:String
    fullPayment: Int
    downPayment:Int
    quantity:Int
    notes:String
    Product:Product
    Vendor:Vendor
    User:User
    rescheduleStatus:String
    rescheduleDate:String
    createdAt:String
    updatedAt:String
}

input OrderForm{
    reservationDate:String
    paymentStatus:String
    downPayment:Int
    quantity:Int
    notes:String 
}

input editOrderUser{
    paymentStatus:String
    rescheduleDate: String
    rescheduleStatus:String
}

input editOrderVendor{
    rescheduleStatus:String
}

input reschedule{
    rescheduleStatus:String
    rescheduleDate:String
}

type Message {
    message: String
}

type Query {
    getOrdersUser(access_token:String): [UserOrder]
    getOrderUser(orderId:ID,access_token:String):UserOrder
    getOrdersVendor(access_token:String): [VendorOrder]
    getOrderVendor(orderId:ID,access_token:String): VendorOrder
    getOrdersUserFilter(access_token:String,paymentStatus:String):[UserOrder]
    getOrdersVendorFilter(access_token:String,paymentStatus:String): [VendorOrder]
    user:User
    product:Product
}

type Mutation{
    createOrder(form: OrderForm,productId:ID,access_token:String): Message
    deleteOrder(orderId:ID):Message
    updateOrderUser(orderId:ID,form:editOrderUser,access_token:String):Message
    updateOrderVendor(orderId:ID,form:editOrderVendor,access_token:String):Message
    updateReschedule(orderId:ID,form:reschedule,access_token:String):Message
}
`

const orderResolvers = {
    Query: {
        getOrdersUser: async (_,args) => {
            try {
                const {access_token}=args
                const cache = await redis.get('get:orders')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/user`,
                        headers:{
                            access_token:access_token
                        }
                    })
                    await redis.set('orders', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        },
        getOrderUser: async (_,args) => {
            try {
                const{orderId,access_token}=args
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/${orderId}/user`,
                        headers:{
                            access_token:access_token
                        }
                    })
                    return data
                
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        },
        getOrdersVendor: async (_,args) => {
            try {
                const {access_token}=args
                const cache = await redis.get('get:orders')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/vendor`,
                        headers:{
                            access_token:access_token
                        }
                    })
                    await redis.set('orders', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        },
        getOrderVendor: async (_,args) => {
            try {
                const{orderId,access_token}=args
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/${orderId}/vendor`,
                        headers:{
                            access_token:access_token
                        }
                    })
                    return data
                
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        },
        getOrdersUserFilter: async (_,args) => {
            try {
                const {access_token,paymentStatus}=args
                const cache = await redis.get('get:orders')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/user/${paymentStatus}`,
                        headers:{
                            access_token:access_token
                        }
                    })
                    await redis.set('orders', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        },
        getOrdersVendorFilter: async (_,args) => {
            try {
                const {access_token,paymentStatus}=args
                const cache = await redis.get('get:orders')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/vendor/${paymentStatus}`,
                        headers:{
                            access_token:access_token
                        }
                    })
                    await redis.set('orders', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error.response.data
            }
        }
    },
    Mutation: {
        createOrder: async (_, args) => {
            try {
                const {productId,form,access_token}=args
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + `/orders/${productId}`,
                    data: form,
                    headers:{
                        access_token:access_token
                    }
                });
                // console.log(data, '<--- data boy');
                await redis.del('get:orders');
                return data;
            } catch (error) {
                // console.log(error, '<--- error create product orchestra');
                throw error.response.data;
            }
        },
        // deleteOrder: async (_, args) => {
        //     try {
        //         const { orderId } = args
        //         const { data } = await axios({
        //             method: 'delete',
        //             url: BASE_URL + '/orders/' + orderId
        //         })
        //         await redis.del('get:orders');
        //         return data
        //     } catch (error) {
        //         console.log(error, '<--- error deleteProduct orches');
        //         throw error.response.data
        //     }
        // },
        updateOrderUser: async (_, args) => {
            try {
                const { orderId,form,access_token} = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/orders/${orderId}/userSchedule`,
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
        updateOrderVendor: async (_, args) => {
            try {
                const { orderId,form,access_token} = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/orders/${orderId}/vendorSchedule`,
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
        updateReschedule: async (_, args) => {
            try {
                const { orderId,form,access_token} = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/orders/${orderId}/userAllowed`,
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
        }
    }
}

module.exports = { orderTypeDefs, orderResolvers }
