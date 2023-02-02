// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { categoryTypeDefs, categoryResolvers } = require('./schemas/categorySchema')
const port = process.env.PORT || 4000
const {vendorTypeDefs, vendorResolvers } = require('./schemas/vendorSchema')
const { productTypeDefs, productResolvers } = require('./schemas/productSchema')
const {orderTypeDefs, orderResolvers } = require('./schemas/orderSchema')
const {invitationTypeDefs, invitationResolvers } = require('./schemas/invitationSchema')


const server = new ApolloServer({
    // typeDefs: [categoryTypeDefs],
    // resolvers: [categoryResolvers],
    typeDefs: [categoryTypeDefs, vendorTypeDefs, productTypeDefs, orderTypeDefs, invitationTypeDefs],
    resolvers: [categoryResolvers, vendorResolvers, productResolvers, orderResolvers, invitationResolvers],
    introspection: true
});

async function startServer() {
    try {
        const { url } = await startStandaloneServer(server, { listen: { port } })
        console.log(`🚀  Server ready at: ${url}`);

    } catch (error) {
        console.log(error, '<---- error startServer orchestrator');
    }
}

startServer()