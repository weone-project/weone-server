const ProductController = require('../controllers/productController.js')
const router = require('express').Router()


// Your route here
router.get('/', ProductController.getAllProduct)
router.post('/', ProductController.createProduct)
router.delete('/:id', ProductController.deleteProduct)


module.exports = router