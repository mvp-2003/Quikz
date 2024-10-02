// quizRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addQuiz,
  getAllQuiz,
  getQuizById,
  editQuiz,
  deleteQuiz,
  addQuestionToQuiz,
  deleteQuestionFromQuiz,
  editQuestionInQuiz,
} = require("../controllers/Quiz");

router.post("/addquiz", authMiddleware, addQuiz);
router.get("/listquiz", authMiddleware, getAllQuiz);
router.get("/getquizbyid/:id", authMiddleware, getQuizById);
router.put("/editQuiz/:id", authMiddleware, editQuiz);
router.delete("/deleteQuiz/:id", authMiddleware, deleteQuiz);
router.post("/addQuestionToQuiz/:id", authMiddleware, addQuestionToQuiz);
router.delete("/deleteQuestionFromQuiz/:id", authMiddleware, deleteQuestionFromQuiz);
router.put("/editQuestionInQuiz/:id", authMiddleware, editQuestionInQuiz);

module.exports = router;
