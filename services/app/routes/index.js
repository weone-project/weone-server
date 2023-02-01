const user = require('./user')
const category = require('./category')
const invitation = require('./invitation')
const product = require('./product')
const vendor = require('./vendor')
const router = require('express').Router()

router.use('/users', user)
router.use('/categories', category)
router.use('/invitations', invitation)
router.use('/products', product)
router.use('/vendors', vendor)

module.exports = router