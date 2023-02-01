const jwt = require('jsonwebtoken')

const createToken = (payload) => jwt.sign(payload, 'duarrrrr')
const decodeToken = (token) => jwt.verify(token, 'duarrrrr')

module.exports = { createToken, decodeToken }

