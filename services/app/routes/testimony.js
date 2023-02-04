const TestimonyController =require("../controllers/testimonyController")
const {authentication} = require('../middlewares/authentication')

const router = require('express').Router()

router.post('/',authentication,TestimonyController.createTestimony)
router.get('/:productId',TestimonyController.showTestimonies)
router.delete('/:testimonyId',authentication,TestimonyController.deleteTestimony)
router.patch('/:testimonyId',authentication,TestimonyController.updateTestimony)
module.exports=router