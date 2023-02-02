const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { Vendor } = require('../models')

class VendorController {
    static async registerVendor(req, res, next) {
        console.log('masuk --');
        try {
            const { name, email, password, phoneNumber, address, vendorImgUrl } = req.body
            const newVendor = await Vendor.create({ name, email, password, phoneNumber, address, vendorImgUrl })

            res.status(201).json({
                id: newVendor.id,
                name: name,
                email: email
            })

        } catch (error) {
            console.log(error, '<---- error registerVendor');
            next(error)
        }
    }

    static async loginVendor(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(email, password, '<----- email');

            const findVendor = await Vendor.findOne({ where: { email } })
            if (!findVendor) throw { name: 'Invalid login' }

            const compareUserPassword = comparePassword(password, findVendor.password)
            if (!compareUserPassword) throw { name: 'Invalid login' }

            const payload = { id: findVendor.id }
            const access_token = createToken(payload)

            res.status(200).json({ access_token })

        } catch (error) {
            console.log(error, '<----- error login vendor');
            next(error)
        }
    }
}

module.exports = VendorController