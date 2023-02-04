const TestimonyController = require("../controllers/testimonyController")
//! Jangan lupa panggil authentication
const router = require('express').Router()

router.post('/', TestimonyController.createTestimony)
router.get('/:productId', TestimonyController.showTestimonies)
router.delete('/:testimonyId', TestimonyController.deleteTestimony)
router.patch('/:testimonyId', TestimonyController.updateTestimony)
module.exports = router