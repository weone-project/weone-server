const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const sendEmailRegister = require('../helpers/nodemailer_register')
class UserController {
  static async registerUser(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address, userImgUrl } = req.body
      let userData = await User.create({ name, email, password, phoneNumber, address, userImgUrl })

      // sendEmailRegister(email)

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

      let compareHashedPassword = comparePassword(password, user.password)

      if (!compareHashedPassword) {
        throw { name: 'Invalid email/password' }
      }

      let payload = {
        id: user.id
      }
      let name = user.name
      // let emailUser = user.email
      let access_token = createToken(payload)

      res.status(200).json({ access_token, name, id: payload.id, email })
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const { email, name } = await verify(google_token);
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username: name,
          password: "dariMbahGugel",
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,  
        email,
      });
      res.json({
        access_token,
        id: user.id,
        email,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      let allUsers = await User.findAll({
        attributes: {
          exclude: ['password']
        }
      })
      res.status(200).json(allUsers)
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params

      let findUser = await User.findByPk(id, {
        attributes: {
          exclude: ['password']
        }
      })

      if (!findUser) {
        throw { name: 'Data not found' }
      }

      res.status(200).json(findUser)
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController