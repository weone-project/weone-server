const user = require('./user')
const category = require('./category')
const invitation = require('./invitation')
const product = require('./product')
const vendor = require('./vendor')
const testimony = require('./testimony')
const order = require('./order')
const midtrans = require('./midtrans')
const router = require('express').Router()


router.use('/users', user)
router.use('/categories', category)
router.use('/invitations', invitation)
router.use('/products', product)
router.use('/vendors', vendor)
router.use('/testimonies', testimony)
router.use('/orders', order)
router.use('/midtrans', midtrans)

module.exports = router