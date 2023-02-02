const TestimonyController =require("../controllers/testimonyController")
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/',TestimonyController.showTestimonies)
router.post('/',TestimonyController.createTestimony)
router.delete('/:testimonyId',TestimonyController.deleteTestimony)
router.put('/:testimonyId',TestimonyController.updateTestimony)
module.exports=router