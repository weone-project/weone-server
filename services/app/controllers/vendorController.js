const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { Vendor, Order, Product } = require('../models')

class VendorController {
    static async registerVendor(req, res, next) {
        console.log('masuk --');
        try {
            const { name, email, password, phoneNumber, city, province, address, vendorImgUrl } = req.body
            const newVendor = await Vendor.create({ name, email, password, phoneNumber, city, province, address, vendorImgUrl })

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
            if (!email) throw { name: 'Email is required' }
            if (!password) throw { name: 'Password is required' }
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
            // const { id } = req.params
            // console.log(id, '<--- ini id');
            // console.log(req.vendor.id, '<---vendorIdboy');
            const findVendor = await Vendor.findByPk(req.vendor.id)
            if (!findVendor) throw { name: 'Data not found' }

            const { name, phoneNumber, city, province, address, vendorImgUrl } = req.body
            if (!name) throw { name: 'Name is required' }

            const updatedVendor = await Vendor.update({
                name,
                phoneNumber,
                city,
                province,
                address,
                vendorImgUrl
            }, {
                where: { id: req.vendor.id }
            })

            res.status(201).json({ message: 'Success update profile vendor' })
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
            // console.log(error, '<---- error getAllVendor - 00');
            next(error)
        }
    }

    static async getVendorById(req, res, next) {
        try {
            const { id } = req.params
            const oneVendor = await Vendor.findByPk(id)
            if (!oneVendor) throw { name: 'Data not found' }

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

    static async updateStatusProduct(req, res, next) {
        try {
            // console.log('MASUK PATCH===');
            const { productId } = req.params
            const { status } = req.body

            let dataProduct = await Product.findByPk(productId)
            if (!dataProduct) {
                throw { name: 'Data not found' }
            }
            await Product.update({ status }, {
                where: { id: productId }
            })

            res.status(200).json({ message: `Status for ${dataProduct.name} changed from ${dataProduct.status} to ${status}` })

        } catch (error) {
            console.log(error, '<---- ERROR DI PATCH');
            next(error)
        }
    }

    static async updateStatusOrder(req, res, next) {
        try {
            console.log('MASUK PATCH===');
            const { orderId } = req.params

            console.log(orderId, '<--ORDERID');
            const { rescheduleStatus } = req.body

            let dataOrder = await Order.findByPk(orderId)
            if (!dataOrder) {
                throw { name: 'Data not found' }
            }
            await Order.update({ rescheduleStatus }, {
                where: { id: orderId }
            })

            res.status(201).json({ message: `Status for ${dataOrder.rescheduleStatus} changed from ${dataOrder.rescheduleStatus} to ${rescheduleStatus}` })

        } catch (error) {
            console.log(error, '<---- ERROR DI PATCH');
            next(error)
        }
    }
}

module.exports = VendorController