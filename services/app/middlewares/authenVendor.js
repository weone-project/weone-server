const { decodeToken } = require("../helpers/jwt");
const { Vendor } = require("../models/index");

async function authenticationVendor(req, res, next) {
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

module.exports = authenticationVendor
