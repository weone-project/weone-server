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
    getUsers(access_token: String): [GetUser]
    getUserById(id: ID, access_token: String): GetUser 
  }

  type Mutation {
      registerUser(form: RegisterFormUser): User
      loginUser(form: LoginFormUser): LoginResponse
  }
`

const userResolvers = {
  Query: {
    getUsers: async (_, args) => {
      try {
        const { access_token } = args
        const cache = await redis.get('get:usersWe-One')
        if (cache) {
          return JSON.parse(cache)
        } else {
          const { data } = await axios({
            method: 'get',
            url: `${BASE_URL}/users`,
            headers: {
              access_token: access_token
            }
          })

          await redis.set('get:usersWe-One', JSON.stringify(data))
          return data
        }
      } catch (error) {
        console.log(error, '<---- error getUsers schema');
        throw error.response.data
      }
    },

    getUserById: async (_, args) => {
      try {
        const { id, access_token } = args
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/users/${id}`,
          headers: {
            access_token: access_token
          }
        })
        await redis.set('get:userByIdWe-One', JSON.stringify(data))
        return data
      }
      catch (error) {
        console.log(error, '<--- error getUserById schema');
        throw error.response.data
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
        await redis.del('get:usersWe-One');
        return data;
      } catch (error) {
        console.log(error, '<--- error registerUser orches');
        throw error.response.data;
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
        throw error.response.data
      }
    }
  }
}

module.exports = { userTypeDefs, userResolvers }
