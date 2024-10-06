const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/Auth')
const {createQuiz, updateQuiz, deleteQuiz, getQuiz} = require('../controllers/quizController');

router.post('/', authenticateUser, createQuiz);
router.put('/:id', authenticateUser, updateQuiz);
router.delete('/:id', authenticateUser, deleteQuiz);
router.get('/:id', getQuiz);

module.exports = router