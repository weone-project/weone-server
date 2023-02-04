const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const userTypeDefs = `#GraphQL
    type User {
        id: ID
        name: String
        email: String
        password: String
        phoneNumber: String
        address: String
        userImgUrl: String
    }

    type GetUser {
        id: ID
        name: String
        email: String
        phoneNumber: String
        address: String
        userImgUrl: String
    }

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

    type LoginResponse {
        id: ID
        name: String
        email: String
        access_token: String
        
    }

    type Query {
      getUsers: [GetUser]
      getUserById(id: ID): GetUser 
  }

    type Mutation {
        registerUser(form: RegisterFormUser): User
        loginUser(form: LoginFormUser): LoginResponse
    }
`

const userResolvers = {
  Query: {
    getUsers: async () => {
      try {
        const cache = await redis.get('get:usersWe-One')
        if (cache) {
          return JSON.parse(cache)
        } else {
          const { data } = await axios({
            method: 'get',
            url: `${BASE_URL}/users`
          })


          await redis.set('get:users', JSON.stringify(data))
          return data
        }
      } catch (error) {
        console.log(error, '<---- error getUsers schema');
        throw error
      }
    },

    getUserById: async (_, args) => {
      try {
        const cache = await redis.get('get:userByIdWe-One')
        if (cache) {
          return JSON.parse(cache)
        } else {
          const { id } = args
          const { data } = await axios({
            method: 'get',
            url: `${BASE_URL}/users/${id}`
          })
          await redis.set('get:userById', JSON.stringify(data))
          return data
        }
      } catch (error) {
        console.log(error, '<--- error getUserById schema');
        throw error
      }
    }
  },
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
    }
  }
}

module.exports = { userTypeDefs, userResolvers }
