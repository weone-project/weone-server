const CategoryController = require('../controllers/categoryController.js')
const router = require('express').Router()


// Your route here
router.get('/', CategoryController.getAllCategory)
router.post('/', CategoryController.createCategory)
router.delete('/:id', CategoryController.deleteCategory)


module.exports = router