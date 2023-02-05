const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authenticationUser(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Invalid token" };
    }

    const verify = decodeToken(access_token);
    const findUser = await User.findByPk(verify.id);

    if (!findUser) {
      throw { name: "Invalid token" };
    }

    req.user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticationUser
