// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 4000

const { typeDefs, resolvers } = require('./schemas/categorySchema');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
});

async function startServer() {
    try {
        const { url } = await startStandaloneServer(server, {
            listen: { port },
        })
        console.log(`🚀  Server ready at: ${url}`);

    } catch (error) {
        console.log(error, '<---- error startServer');
    }
}

startServer()