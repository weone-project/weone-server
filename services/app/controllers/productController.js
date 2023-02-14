const { Product, Vendor, Category, User } = require('../models')


class ProductController {

    // Ini buat vendor, bakal nampilin semua produk sesuai vendorId nya, dan statusnya active & inactive
    static async getAllProduct(req, res, next) {
        try {
            const vendorId = req.vendor.id
            const dataProduct = await Product.findAll({
                include: [
                    {
                        model: Vendor
                    },
                    {
                        model: Category
                    }
                ],
                where: { VendorId: vendorId }


            })
            res.status(200).json(dataProduct)

        } catch (error) {
            next(error)
        }
    }

    // Ini buat user, cuma nampilin yang statusnya active aja
    static async getAllProductActive(req, res, next) {
        try {
            const dataProduct = await Product.findAll({
                include: [
                    {
                        // attributes: { exclude: ['password'] },
                        model: Vendor
                    },
                    {
                        model: Category
                    }
                ],
                where: { status: 'Active' }
            })
            res.status(200).json(dataProduct)

        } catch (error) {
            next(error)
        }
    }

    // static async getAllProductActive(req, res, next) {
    //     try {
    //         const vendorId = req.vendor.id
    //         const dataProduct = await Product.findAll({
    //             include: [
    //                 {
    //                     // attributes: { exclude: ['password'] },
    //                     model: Vendor
    //                 },
    //                 {
    //                     model: Category
    //                 }
    //             ],
    //             where: { status: 'Active' }
    //         })
    //         res.status(200).json(dataProduct)

    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params
            const oneProduct = await Product.findByPk(id, {
                include: [
                    {
                        // attributes: { exclude: ['password'] },
                        model: Vendor
                    },
                    {
                        model: Category
                    }
                ],
                where: { status: 'Active' }
            })
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

            // console.log(req.vendor.id , '<=== idvendor');

            const newProduct = await Product.create({
                name,
                description,
                imgUrl, //: stringifyImgUrl,
                price,
                estimatedDay,
                rating: null,
                dpPrice,
                VendorId: req.vendor.id,
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
            const findProduct = await Product.findByPk(id)
            if (!findProduct) throw { name: 'Data not found' }

            const { name, description, imgUrl, price, estimatedDay, rating, dpPrice, VendorId, CategoryId } = req.body

            if (!name) throw { name: 'Product Name is required' }
            if (!description) throw { name: 'Description is required' }
            if (!imgUrl) throw { name: 'Img Url is required' }
            if (!price) throw { name: 'Price is required' }
            if (!CategoryId) throw { name: 'Category Id is required' }


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