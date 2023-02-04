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
            // console.log(error, '<---- error registerVendor');
            next(error)
        }
    }

    static async loginVendor(req, res, next) {
        try {
            const { email, password } = req.body
            if(!email) throw { name: 'Email is required'}
            if(!password) throw { name: 'Password is required'}
            // console.log(email, password, '<----- email');

            const findVendor = await Vendor.findOne({ where: { email } })
            if (!findVendor) throw { name: 'Invalid email/password' }

            const compareUserPassword = comparePassword(password, findVendor.password)
            if (!compareUserPassword) throw { name: 'Invalid email/password' }

            const payload = { id: findVendor.id }
            const access_token = createToken(payload)

            res.status(200).json({
                id: findVendor.id,
                name: findVendor.name,
                email: findVendor.email,
                access_token,
            })

        } catch (error) {
            console.log(error, '<----- error login vendor');
            next(error)
        }
    }

    static async updateVendor(req, res, next) {
        try {
            const { id } = req.params
            console.log(id, '<--- ini id');
            const findVendor = await Vendor.findByPk(id)
            if (!findVendor) throw { name: 'Data not found' }
            
            const { name, phoneNumber, address, vendorImgUrl } = req.body
            const updatedVendor = await Vendor.update({
                name,
                phoneNumber,
                address,
                vendorImgUrl
            }, {
                where: { id }
            })
            
            res.status(201).json({message: 'Success update profile vendor'})
        } catch (error) {
            console.log(error, '<=======> error updateVendor');
            next(error)
        }
    }

    static async getAllVendor(req, res, next) {
        try {
            // const { access_token } = req.headers
            // if (!access_token) throw { name: 'Invalid token' }

            const dataVendor = await Vendor.findAll()

            res.status(200).json(dataVendor)

        } catch (error) {
            console.log(error, '<---- error getAllVendor - 00');
            next(error)
        }
    }

    static async getVendorById(req, res, next) {
        try {
            const { id } = req.params
            const oneVendor = await Vendor.findByPk(id)
            if(!oneVendor) throw {name: 'Data not found'}

            res.status(200).json(oneVendor)
        } catch (error) {
            console.log(error, '<---- error getVendorId');
            next(error)
        }
    }

    static async deleteVendor(req, res, next) {
        try {
            const { id } = req.params
            const findOne = await Vendor.findByPk(id)
            if (!findOne) {
                throw { name: 'Data not found' }
            }

            await Vendor.destroy({ where: { id } })
            res.status(200).json({ message: `Account ${findOne.name} has been deleted` })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = VendorController