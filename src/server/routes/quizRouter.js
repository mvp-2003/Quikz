const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/Auth');
const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzes,
} = require('../controllers/quizController');

router.post('/create', authenticateUser, createQuiz);
router.put('/:id', authenticateUser, updateQuiz);
router.delete('/:id', authenticateUser, deleteQuiz);
router.get('/:id', getQuiz);
router.get('/', getQuizzes);

module.exports = router;
