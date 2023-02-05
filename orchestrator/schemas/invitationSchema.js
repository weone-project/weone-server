const redis = require('../config/redis')
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

const invitationTypeDefs = `#GraphQL
  type Invitation {
    id: ID
    quote: String
    quote_src: String
    bride: String
    bride_img: String
    bride_nick: String
    bride_mother: String
    bride_father: String
    groom: String
    groom_img: String
    groom_nick: String
    groom_mother: String
    groom_father: String
    matrimony_name: String
    matrimony_date: String
    matrimony_time_start: Int
    matrimony_time_end: Int
    ceremonial_name: String
    ceremonial_date: String
    ceremonial_time_start: Int
    ceremonial_time_end: Int
    map_location: String
    address_ceremonial: String
    address_matrimony: String
    photo: String
    story: String
    story_img: String
    wallet_bank: String
    wallet_no: Int
    wallet_owner: String
    MusicId: Int
    OrderId: Int
  }

  input CreateInvitationForm {
    quote: String
    quote_src: String
    bride: String
    bride_img: String
    bride_nick: String
    bride_mother: String
    bride_father: String
    groom: String
    groom_img: String
    groom_nick: String
    groom_mother: String
    groom_father: String
    matrimony_name: String
    matrimony_date: String
    matrimony_time_start: Int
    matrimony_time_end: Int
    ceremonial_name: String
    ceremonial_date: String
    ceremonial_time_start: Int
    ceremonial_time_end: Int
    map_location: String
    address_ceremonial: String
    address_matrimony: String
    photo: String
    story: String
    story_img: String
    wallet_bank: String
    wallet_no: Int
    wallet_owner: String
    MusicId: Int
    OrderId: Int
  }

  type Message {
    message: String
  }

  type Query {
    getInvitations(access_token: String): [Invitation]
    getInvitationById(id: ID, access_token: String): Invitation 
  }

  type Mutation {
    createInvitation(form: CreateInvitationForm, access_token: String) : Message
    updateInvitation(id: ID, form: CreateInvitationForm, access_token: String) : Message
  }

`

const invitationResolvers = {
  Query: {
    getInvitations: async (_, args) => {
      try {
        const { access_token } = args
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/invitations`,
          headers: {
            access_token: access_token
          }
        })

        await redis.set('get:invitations', JSON.stringify(data))
        return data

      } catch (error) {
        // console.log(error, '<---- error getInvitations schema');
        throw error
      }
    },

    getInvitationById: async (_, args) => {
      try {
        const { id, access_token } = args
        // console.log(id, 'IDIDIDIDID');
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/invitations/${id}`,
          headers: {
            access_token: access_token
          }
        })

        await redis.set('get:invitationById', JSON.stringify(data))
        return data

      } catch (error) {
        // console.log(error, '<---- error getInvitationById schema');
        throw error
      }
    }
  },
  Mutation: {
    createInvitation: async (_, args) => {
      try {
        const { access_token } = args
        const { data } = await axios({
          method: "post",
          url: `${BASE_URL}/invitations`,
          data: args.form,
          headers: {
            access_token: access_token
          }
        });
        await redis.del('get:invitations');
        return data;
      } catch (error) {
        console.log(error, '<---- error createInvitation schema');
        throw error
      }
    },

    updateInvitation: async (_, args) => {
      try {
        const { id, access_token } = args
        const { data } = await axios({
          method: 'put',
          url: `${BASE_URL}/invitations/${id}`,
          data: args.form,
          headers: {
            access_token: access_token
          }
        })
        await redis.del('get:invitations');
        return data;
      } catch (err) {
        throw err;
      }
    },
  }
}

module.exports = { invitationTypeDefs, invitationResolvers }
