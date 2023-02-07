const { Testimony, Product, User } = require('../models/index')

class TestimonyController {
    static async showTestimonies(req, res, next) {
        try {
            let { productId } = req.params
            const testimonies = await Testimony.findAll({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password']
                        }
                    },
                    {
                        model: Product
                    }
                ],
                where: {
                    ProductId: productId
                }
            })
            res.status(200).json(testimonies)
        } catch (error) {
            next(error)
        }
    }
    static async createTestimony(req, res, next) {
        try {
            let UserId = req.user.id
            let { testimony, productId, rating } = req.body
            await Testimony.create({
                UserId: UserId, ProductId: productId, testimony, rating
            })
            let productTestimonies = await Product.findOne({
                attributes: ['rating'],
                where: {
                    id: productId
                }
            })
            let countRatingInTestimony = await Testimony.findAll({
                attributes: ['rating'],
                where: {
                    ProductId: productId
                }
            })
            // console.log(productTestimonies.rating)
            let counting = +productTestimonies.rating
            countRatingInTestimony.forEach((element) => {
                counting += element.rating
            })
            counting /=countRatingInTestimony.length+1
            let roundedCounting=Math.round(counting * 10) / 10
            await Product.update({
                rating:roundedCounting
            },{
                where:{
                    id:productId
                }
            })
            res.status(201).json({ message: `Testimony created now and rating of the product ${productId} and the rating is ${roundedCounting}` })
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
            let oldTestimony = await Testimony.findByPk(testimonyId)
            let differenceDate = new Date().getDate() - oldTestimony.createdAt.getDate()
            if (differenceDate <= 2) {
                await Testimony.update({ testimony }, {
                    where: {
                        id: testimonyId
                    }
                })
                res.status(200).json({ message: 'Testimony has been updated' })
            }
            else {
                throw { name: "Testimony cannot be updated" }
            }

        } catch (error) {
            next(error)
        }
    }
}
module.exports = TestimonyController