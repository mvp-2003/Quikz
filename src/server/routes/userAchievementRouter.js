const express = require('express');
const router = express.Router();
const {
  fetchAchievements,
  awardAchievement,
  deleteAchievement,
} = require('../controllers/userAchievementController');
const authenticate = require('../middlewares/Auth');

router.get('/:userId/', authenticate, fetchAchievements);
router.post('/:userId/:achievementId', authenticate, awardAchievement);
f;
router.delete('/:userId/:achievementId', authenticate, deleteAchievement);

module.exports = router;
