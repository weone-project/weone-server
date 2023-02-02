const CategoryController = require('../controllers/categoryController.js')
const router = require('express').Router()


// Your route here
// router.get('/', ProductController.createProduct)
router.post('/', CategoryController.createCategory)


module.exports = router