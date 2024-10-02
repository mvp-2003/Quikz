// Import Libraries
const { Router } = require('express');

// Import Individual Routes
const UserRoute = require('./User');
const AuthRoute = require('./Auth');
const QuizRoute = require('./Quiz');
const ReportRoute = require('./Report');
const quizCategory = require("./QuizCategory");
// Setup Router
const router = Router();

router.use('/api/users', UserRoute);
router.use('/api/auth', AuthRoute);
router.use('/api/quiz', QuizRoute);
router.use('/api/report', ReportRoute);
router.use('/api/category',quizCategory);
module.exports = router;
