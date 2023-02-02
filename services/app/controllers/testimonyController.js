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
    static async createTestimony(req,res,next){
        try {
            let UserId=req.user.id
            let {newTestimony,productId}=req.body
            await Testimony.create({
                UserId:2,ProductId:2,Testimony:newTestimony
            })
            res.status(201).json({message:'Testimony created now'})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = TestimonyController