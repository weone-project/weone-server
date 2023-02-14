const { decodeToken } = require("../helpers/jwt");
const { Vendor } = require("../models/index");

async function authenticationVendor(req, res, next) {
  console.log('===masuk authen===');
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
      username: findVendor.name,
      email: findVendor.email,
    };
    console.log(req.vendor, '<---- REQQQ');
    
    next();
  } catch (error) {
    console.log(error, '<----- error authenVendor');
    next(error);
  }
}

module.exports = authenticationVendor
