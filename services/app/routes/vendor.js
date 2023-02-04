const VendorController = require('../controllers/vendorController.js')
const router = require('express').Router()


// Your route here
router.get('/', VendorController.getAllVendor)
router.post('/register', VendorController.registerVendor)
router.post('/login', VendorController.loginVendor)
router.get('/:id', VendorController.getVendorById)
router.put('/:id', VendorController.updateVendor)
router.delete('/:id', VendorController.deleteVendor)
router.patch('/orders/:orderId', VendorController.updateStatusOrder)


module.exports = router