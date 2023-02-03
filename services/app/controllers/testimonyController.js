const { Testimony,Product } = require('../models/index')

class TestimonyController {
    static async showTestimonies(req, res, next) {
        try {
            let {productId}=req.params
            const testimonies = await Testimony.findAll({
                where:{
                    ProductId:productId
                }
            })
            res.status(200).json(testimonies)
        } catch (error) {
            next(error)
        }
    }
    static async createTestimony(req, res, next) {
        try {
            // let UserId=req.user.id
            let UserId=1
            let { testimony, productId,vendorId } = req.body
            await Testimony.create({
                UserId: UserId, ProductId: productId, testimony,VendorId:vendorId
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
            let oldTestimony=await Testimony.findByPk(testimonyId)
            let differenceDate=new Date().getDate()-oldTestimony.createdAt.getDate()
            if(differenceDate<=2){
                await Testimony.update({ testimony }, {
                    where: {
                      id: testimonyId
                    }
                })
                res.status(200).json({ message: 'Testimony has been updated' })
            }
            else{
                throw{name:"Testimony cannot be updated"}
            }
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = TestimonyController