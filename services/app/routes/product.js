const ProductController = require('../controllers/productController.js')
const router = require('express').Router()


// Your route here
router.get('/', ProductController.createProduct)
// router.post('/register', VendorController.registerVendor)
// router.post('/login', VendorController.loginVendor)


module.exports = router