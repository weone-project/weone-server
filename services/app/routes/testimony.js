const TestimonyController =require("../controllers/testimonyController")
const authenticationUser=require('../middlewares/authenUser')

const router = require('express').Router()

router.post('/',authenticationUser,TestimonyController.createTestimony)
router.get('/:productId',TestimonyController.showTestimonies)
router.delete('/:testimonyId',authenticationUser,TestimonyController.deleteTestimony)
router.patch('/:testimonyId',authenticationUser,TestimonyController.updateTestimony)
module.exports=router
