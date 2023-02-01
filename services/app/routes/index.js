const users = require('./users')
const items = require('./items')
const categories = require('./categories')
const router = require('express').Router()

router.use('/users', users)
// router.use('/items', items)
// router.use('/categories', categories)

module.exports = router