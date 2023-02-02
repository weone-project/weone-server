const { Testimony } = require('../models/index')

class TestimonyController {
    static async showTestimonies(req, res, next) {
        try {
            const testimonies = await Testimony.findAll()
            res.status(200).json(testimonies)
        } catch (error) {
            next(error)
        }
    }
    static async createTestimony(req, res, next) {
        try {
            // let UserId=req.user.id
            let { testimony, productId } = req.body
            await Testimony.create({
                UserId: 1, ProductId: 1, testimony
            })
            res.status(201).json({ message: 'Testimony created now' })
        } catch (error) {
            next(error)
        }
    }
    static async deleteTestimony(req, res, next) {
        try {
            let { testimonyId } = req.params
            const findOne = await Testimony.findByPk(testimonyId)
            if (!findOne) {
                throw { name: 'Data not found' }
            }
            await Testimony.destroy({
                where: {
                    id: testimonyId
                }
            })
            res.status(200).json({ message: `Testimony has been deleted` })
        } catch (error) {
            next(error)
        }
    }
    static async updateTestimony(req, res, next) {
        try {
            // let UserId=req.user.id
            let { testimonyId } = req.params
            let { testimony, productId } = req.body
            await Testimony.update({ testimony }, {
                where: {
                  id: testimonyId
                }
            })
            res.status(200).json({ message: 'Testimony has been updated' })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = TestimonyController