const express = require('express');
const router = express.Router();
const {
  fetchAchievements,
  awardAchievement,
  deleteAchievement,
} = require('../controllers/userAchievementController');

router.get('/:userId/', fetchAchievements);
router.post('/:userId/:achievementId', awardAchievement);
router.delete('/:userId/:achievementId', deleteAchievement);

module.exports = router;
