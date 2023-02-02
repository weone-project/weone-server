const TestimonyController = require('../controllers/testimonyController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/',authentication,TestimonyController.showTestimonies)
router.get('/',authentication,TestimonyController.createTestimony)
module.exports=router