const jwt = require('jsonwebtoken')

const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET)
const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = { createToken, decodeToken }

