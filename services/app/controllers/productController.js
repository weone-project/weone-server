const { Product } = require('../models')


class ProductController {
    static async getAllProduct(req, res, next) {
        try {
            const dataProduct = await Product.findAll()
            res.status(200).json(dataProduct)

        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params
            const oneProduct = await Product.findByPk(id)
            if (!oneProduct) throw { name: 'Data not found' }

            res.status(200).json(oneProduct)
        } catch (error) {
            console.log(error, '<---- error getProductById');
            next(error)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const { name, description, imgUrl, price, estimatedDay, rating, dpPrice, VendorId, CategoryId } = req.body
            let stringifyImgUrl = JSON.stringify(imgUrl)

            const newProduct = await Product.create({
                name,
                description,
                imgUrl, //: stringifyImgUrl,
                price,
                estimatedDay,
                rating: 1,
                dpPrice,
                VendorId: 1, //! Nanti di ubah id dari access_token
                CategoryId
            })

            res.status(201).json({
                message: `Product ${name} created!`
            })

        } catch (error) {
            console.log(error, '<---- error create Product');
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const { id } = req.params
            const { name, description, imgUrl, price, estimatedDay, rating, dpPrice, VendorId, CategoryId } = req.body
            const findProduct = await Product.findByPk(id)

            if (!findProduct) throw { name: 'Data not found' }
            await Product.update({
                name,
                description,
                imgUrl,
                price,
                estimatedDay,
                rating: findProduct.rating,
                dpPrice,
                VendorId: findProduct.VendorId,
                CategoryId
            }, {
                where: { id }
            })

            res.status(201).json({ message: `Success update prodcuct ${name}` })

        } catch (error) {
            console.log(error, '<---- error update product');
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params
            const findOne = await Product.findByPk(id)
            if (!findOne) {
                throw { name: 'Data not found' }
            }

            await Product.destroy({ where: { id } })
            res.status(200).json({ message: `${findOne.name} has been deleted` })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController