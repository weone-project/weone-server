const { User } = require('../models/index')
class UserController {
  static async registerUser(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address, userImgUrl } = req.body
      let userData = await User.create({ name, email, password, phoneNumber, address, userImgUrl })
      res.status(201).json(userData)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController