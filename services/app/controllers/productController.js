const { Product } = require('../models')


class ProductController {
    static async createProduct(req, res, next) {
        try {
            const { name, description, imgUrl, price, estimatedDay, rating, dpPrice, VendorId, CategoryId } = req.body
            const newProduct = await Product.create({
                name,
                description,
                imgUrl,
                price,
                estimatedDay,
                rating: 1,
                dpPrice,
                VendorId: 1, //! Nanti di ubah id dari access_token
                CategoryId
            })

            res.status(201).json({
                message: 'New product created!'
            })

        } catch (error) {
            console.log(error, '<---- error create Product');
            next(error)
        }
    }
}

module.exports = ProductController