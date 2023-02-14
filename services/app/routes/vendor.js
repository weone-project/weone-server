const VendorController = require('../controllers/vendorController.js')
const authenticationVendor = require('../middlewares/authenVendor.js')
const router = require('express').Router()


// Your route here
router.get('/', VendorController.getAllVendor)
router.put('/', authenticationVendor, VendorController.updateVendor)
router.post('/register', VendorController.registerVendor)
router.post('/login', VendorController.loginVendor)
router.get('/:id', VendorController.getVendorById)
router.delete('/:id', VendorController.deleteVendor)
router.patch('/:productId', authenticationVendor, VendorController.updateStatusProduct)
router.patch('/orders/:orderId', VendorController.updateStatusOrder)


module.exports = router