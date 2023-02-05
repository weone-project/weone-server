const { Category } = require('../models')

class CategoryController {
    static async getAllCategory(req, res, next) {
        try {
            const dataCategory = await Category.findAll()
            res.status(200).json(dataCategory)

        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const { name } = req.body
            const newCategory = await Category.create({ name })

            res.status(201).json({
                message: `Category ${name} created`
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params
            const findOne = await Category.findByPk(id)
            if (!findOne) {
                throw { name: 'Data not found' }
            }

            await Category.destroy({ where: { id } })
            res.status(200).json({ message: `${findOne.name} has been deleted` })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController