const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const userTypeDefs = `#GraphQL
    input RegisterFormUser {
        name: String
        email: String
        password: String
        phoneNumber: String
        address: String
        userImgUrl: String
    }
    
    input LoginFormUser {
        email: String
        password: String
    }

    type User {
        id: ID
        name: String
        email: String
        password: String
        phoneNumber: String
        address: String
        userImgUrl: String
        
    }

    type LoginResponse {
        id: ID
        name: String
        email: String
        access_token: String
        
    }

    type Mutation {
        registerUser(form: RegisterFormUser): User
        loginUser(form: LoginFormUser): LoginResponse
    }
`

const userResolvers = {
    Mutation: {
        registerUser: async (_, args) => {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${BASE_URL}/users/register`,
                    data: args.form,
                });

                return data;
            } catch (error) {
                console.log(error, '<--- error registerUser orches');
                throw error;
            }
        },

        loginUser: async (_, args) => {
            try {
                const { data } = await axios({
                    method: 'post',
                    url: `${BASE_URL}/users/login`,
                    data: args.form
                })

                return data
            } catch (error) {
                console.log(error, '<--- error loginUser schema');
                throw error
            }
        },

    }
}

module.exports = { userTypeDefs, userResolvers }
