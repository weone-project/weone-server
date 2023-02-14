// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { categoryTypeDefs, categoryResolvers } = require('./schemas/categorySchema')
const port = process.env.PORT || 4000
const { vendorTypeDefs, vendorResolvers } = require('./schemas/vendorSchema')
const { productTypeDefs, productResolvers } = require('./schemas/productSchema')
const { orderTypeDefs, orderResolvers } = require('./schemas/orderSchema')
const { invitationTypeDefs, invitationResolvers } = require('./schemas/invitationSchema');
const { userTypeDefs, userResolvers } = require("./schemas/userSchema");
const { testimonyTypeDefs, testimonyResolvers } = require("./schemas/testimonyScema")
const { midtransTypeDefs, midtransResolvers } = require("./schemas/midtransSchema")


const server = new ApolloServer({
    typeDefs: [categoryTypeDefs, vendorTypeDefs, productTypeDefs, orderTypeDefs, invitationTypeDefs, userTypeDefs, testimonyTypeDefs, midtransTypeDefs],
    resolvers: [categoryResolvers, vendorResolvers, productResolvers, orderResolvers, invitationResolvers, userResolvers, testimonyResolvers, midtransResolvers],
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