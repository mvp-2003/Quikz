const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/Auth');
const {
  registerUser,
  loginUser,
  emailVerification,
} = require('./../controllers/userAuthController');

router.post('/register', authenticate, registerUser);
router.post('/login', authenticate, loginUser);
router.post('/verify', authenticate, emailVerification);

module.exports = router;
