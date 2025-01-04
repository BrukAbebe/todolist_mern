
const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory,updateCategory } = require('../controllers/categoryController');


router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;