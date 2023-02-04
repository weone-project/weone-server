const ProductController = require('../controllers/productController.js')
const router = require('express').Router()


// Your route here
router.get('/', ProductController.getAllProduct)
router.get('/active', ProductController.getAllProductActive)
router.post('/', ProductController.createProduct)
router.get('/:id', ProductController.getProductById)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)


module.exports = router