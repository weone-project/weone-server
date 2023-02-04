const { decodeToken } = require("../helpers/jwt");
const { User,Vendor } = require("../models/index");

async function authentication(req, res, next) {
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
      status: findUser.status
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function vendorAuthentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Invalid token" };
    }

    const verify = decodeToken(access_token);
    const findVendor = await Vendor.findByPk(verify.id);

    if (!findVendor) {
      throw { name: "Invalid token" };
    }

    req.vendor = {
      id: findVendor.id,
      username: findVendor.username,
      email: findVendor.email,
      status: findVendor.status
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports =  {authentication,vendorAuthentication}
