const { Category } = require('../models')

class CategoryController {
    static async createCategory(req, res, next) {
        try {
            const { name } = req.body
            const newCategory = await Category.create({ name})

            res.status(201).json({
                message: `Category ${name} created!`
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController