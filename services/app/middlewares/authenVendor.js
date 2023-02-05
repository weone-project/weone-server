const { decodeToken } = require("../helpers/jwt");
const { Vendor } = require("../models/index");

async function authenticationVendor(req, res, next) {
  console.log('===masuk authen===');
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Invalid token" };
    }

    const payload = decodeToken(access_token);
    const findUser = await Vendor.findByPk(payload.id);

    // console.log(findUser, '<---- FINDUSER');

    if (!findUser) {
      throw { name: "Invalid token" };
    }

    req.vendor = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    };
    console.log(req.vendor, '<---- REQQQ');
    
    next();
  } catch (error) {
    console.log(error, '<----- error authenVendor');
    next(error);
  }
}

module.exports = authenticationVendor
