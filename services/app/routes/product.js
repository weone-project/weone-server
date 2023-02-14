const ProductController = require('../controllers/productController.js')
const authenticationVendor = require('../middlewares/authenVendor.js')
const router = require('express').Router()


// Your route here
router.get('/', authenticationVendor,ProductController.getAllProduct) // Ini buat vendor, bakal nampilin semua produk sesuai vendorId nya, dan statusnya active & inactive
router.post('/', authenticationVendor, ProductController.createProduct)
router.get('/active', ProductController.getAllProductActive) // Ini buat user, cuma nampilin yang statusnya active aja
// router.get('/vendor', ProductController.getAllProductVendor) // Ini buat vendor, nampilin semua produk dia
router.get('/:id', ProductController.getProductById)
router.put('/:id', authenticationVendor, ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)


module.exports = router