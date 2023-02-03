const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class UserController {
  static async registerUser(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address, userImgUrl } = req.body
      let userData = await User.create({ name, email, password, phoneNumber, address, userImgUrl })
      res.status(201).json(userData)
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email) {
        throw { name: 'Email is required' }
      }

      if (!password) {
        throw { name: 'Password is required' }
      }

      let user = await User.findOne({
        where: {
          email
        }
      })
      //! belom ada authentication

      let compareHashedPassword = comparePassword(password, user.password)

      if (!compareHashedPassword) {
        throw { name: 'Invalid email/password' }
      }

      let payload = {
        id: user.id
      }
      let username = user.username
      let emailUser = user.email
      let access_token = createToken(payload)

      res.status(200).json({ access_token, username, id: payload.id, emailUser })
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      let allUsers = await User.findAll()
      res.status(200).json(allUsers)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController