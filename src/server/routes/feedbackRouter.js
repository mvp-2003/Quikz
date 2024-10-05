const express = require('express');
const router=express.Router();

const authenticateUser=require("../middlewares/Auth.js")

const { submitFeedback, 
  retrieveFeedbackBasedOnQuizId,
  retrieveFeedbackBasedOnUserId 
} = require("../controllers/feedbackController.js")

router.route("/quiz/:quizId")
  .get(retrieveFeedbackBasedOnQuizId)
  .post(authenticateUser,submitFeedback);

router.route("/user").get(authenticateUser,retrieveFeedbackBasedOnUserId);

module.exports = router;