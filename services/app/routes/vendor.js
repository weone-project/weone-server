const VendorController = require('../controllers/vendorController.js')
const router = require('express').Router()


// Your route here
router.get('/', VendorController.getAllVendor)
router.post('/register', VendorController.registerVendor)
router.post('/login', VendorController.loginVendor)
router.put('/:id', VendorController.updateVendor)


module.exports = router