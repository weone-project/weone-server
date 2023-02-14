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
    Music: Music
    Order: Order
    Greets: [Greet]
  }

  type Music {
    id: ID
    band: String
    song: String
    song_src: String
  }

  type Greet {
    id: ID
    guest: String
    presence: String
    greeting: String
    date: String
    InvitationId: Int
  }

  type UserInvitation {
    id: ID
    name: String
    email: String
    phoneNumber: String
    address: String
    userImgUrl: String
  }

  type Order {
    id: ID
    ProductId: Int
    VendorId: Int
    reservationDate: String
    rescheduleDate: String
    rescheduleStatus: String
    paymentStatus: String
    fullPayment: Int
    downPayment: Int
    quantity: Int
    User: UserInvitation
  }

  type InvitationGuestBook {
    id: ID
    GuestBooks: [GuestBook]
  }

  type GuestBook {
    name: String
    InvitationId: Int
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

  input InputGuestBookByInvitationForm {
    name: String
    InvitationId: Int
  }
  
  input GreetingForm {
    guest: String
    presence: String
    greeting: String
    date: String
    InvitationId: Int
  }

  type Message {
    message: String
  }

  type Query {
    getInvitations(access_token: String): [Invitation]
    getInvitationById(id: ID): Invitation
    getGreetingsByInvitation(id: ID, access_token: String): [Greet]
    getGuestBookByInvitation(id: ID, access_token: String): [InvitationGuestBook]
    getAllMusics: [Music]
  }

  type Mutation {
    createInvitation(form: CreateInvitationForm, access_token: String) : Message
    updateInvitation(id: ID, form: CreateInvitationForm, access_token: String) : Message
    createGreetingByInvitation(id: ID, form: GreetingForm): Greet
    inputGuestBookByInvitation(id: ID, form: InputGuestBookByInvitationForm): Message
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
        throw error.response.data
      }
    },

    getInvitationById: async (_, args) => {
      try {
        const { id } = args
        // console.log(id, 'IDIDIDIDID');
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/invitations/${id}`
        })

        await redis.set('get:invitationById', JSON.stringify(data))
        return data

      } catch (error) {
        // console.log(error, '<---- error getInvitationById schema');
        throw error.response.data
      }
    },

    getGreetingsByInvitation: async (_, args) => {
      try {
        const { id, access_token } = args
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/invitations/${id}/greets`,
          headers: {
            access_token: access_token
          }
        })

        await redis.set('get:greetingsByInvitation', JSON.stringify(data))
        return data
      } catch (error) {
        // console.log(error, '<---- error getGreetingsByInvitation schema');
        throw (error);
      }
    },

    getGuestBookByInvitation: async (_, args) => {
      try {
        const { id, access_token } = args
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/invitations/${id}/guestsBook`,
          headers: {
            access_token: access_token
          }
        })

        await redis.set('get:guestBookByInvitation', JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error, '<---- error getGreetingsByInvitation schema');
        throw (error);
      }
    },

    getAllMusics: async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/invitations/musics`
        })

        await redis.set('get:allMusics', JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error, '<---- error getAllMusics schema');
        throw (error);
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
        throw error.response.data
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
      } catch (error) {
        throw error.response.data;
      }
    },

    createGreetingByInvitation: async (_, args) => {
      try {
        const { id } = args
        const { data } = await axios({
          method: 'post',
          url: `${BASE_URL}/invitations/${id}/greets`,
          data: args.form
        })
        await redis.del('get:greetingsByInvitation')
        return data
      } catch (error) {
        // console.log(error, '<---- error createGreetingByInvitation schema');
        throw (error);
      }
    },

    inputGuestBookByInvitation: async (_, args) => {
      try {
        const { id } = args
        const { data } = await axios({
          method: 'post',
          url: `${BASE_URL}/invitations/${id}/guestsBook`,
          data: args.form
        })
        await redis.del('get:guestBookByInvitation')
        return data
      } catch (error) {
        console.log(error, '<---- error inputGuestBookByInvitation schema');
        throw (error);
      }
    }
  }
}

module.exports = { invitationTypeDefs, invitationResolvers }
