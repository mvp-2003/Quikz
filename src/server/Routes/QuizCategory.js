const express = require('express');
const router = express.Router();
const { getCategories, addCategory, deleteCategory } = require('../controllers/quizCategory');

// Route to get all quiz categories
router.get('/listAll', getCategories);

// Route to add a new category
router.post('/add', addCategory);

// Route to delete a category
router.delete('/delete/:id', deleteCategory);

module.exports = router;
