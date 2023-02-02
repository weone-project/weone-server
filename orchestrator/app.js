// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 4000

const { typeDefs: categoryTypeDefs, resolvers: categoryResolvers } = require('./schemas/categorySchema')
const { typeDefs: vendorTypeDefs, resolvers: vendorResolvers } = require('./schemas/vendorSchema')
const { typeDefs: productTypeDefs, resolvers: productTypeDefs } = require('./schemas/productSchema')
const { typeDefs: orderTypeDefs, resolvers: productResolvers, orderResolvers } = require('./schemas/orderSchema')
const { typeDefs: invitationTypeDefs, resolvers: invitationResolvers } = require('./schemas/invitationSchema')


const server = new ApolloServer({
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