const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const orderTypeDefs = `#GraphQL
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

type Order{
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
}

input OrderForm{
    reservationDate:String
    paymentStatus:String
    downPayment:Int
    quantity:Int
    notes:String 
}

input editOrder{
    paymentStatus:String
}

type Message {
    message: String
}

type Query {
    getOrders: [Order]
    getOrder(orderId:ID):Order
    user:User
    product:Product
}

type Mutation{
    createOrder(form: OrderForm,productId:ID): Message
    deleteOrder(orderId:ID):Message
    updateOrder(orderId:ID,form:editOrder):Message
}
`

const orderResolvers = {
    Query: {
        getOrders: async () => {
            try {
                const cache = await redis.get('get:orders')
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/user`
                    })
                    await redis.set('orders', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error, '<--- error getProducts schema');
                throw error
            }
        },
        getOrder: async (_,args) => {
            try {
                const{orderId}=args
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: BASE_URL + `/orders/${orderId}`
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
        createOrder: async (_, args) => {
            // console.log(args, '<--- this args');
            try {
                const {productId,form}=args
                const { data } = await axios({
                    method: 'post',
                    url: BASE_URL + `/orders/${productId}`,
                    data: form,
                });
                // console.log(data, '<--- data boy');
                await redis.del('get:orders');
                return data;
            } catch (error) {
                // console.log(error, '<--- error create product orchestra');
                throw error;
            }
        },
        deleteOrder: async (_, args) => {
            try {
                const { orderId } = args
                const { data } = await axios({
                    method: 'delete',
                    url: BASE_URL + '/orders/' + orderId
                })
                await redis.del('get:orders');
                return data
            } catch (error) {
                console.log(error, '<--- error deleteProduct orches');
                throw error
            }
        },
        updateOrder: async (_, args) => {
            try {
                const { orderId,form} = args
                const { data } = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/orders/${orderId}`,
                    data: form,
                })
                await redis.del('get:testimonies');
                return data;
            } catch (err) {
                throw err;
            }
        }
    }
}

module.exports = { orderTypeDefs, orderResolvers }
