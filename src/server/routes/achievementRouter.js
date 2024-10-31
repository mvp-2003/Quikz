const express = require('express');
const router = express.Router();
const {
  fetchAchievement,
  fetchAchievements,
  createAchievements,
  deleteAchievements,
} = require('../controllers/achievementContoller');

router.get('/', fetchAchievements);
router.get('/:achievementId', fetchAchievement);
router.post('/', createAchievements);
router.delete('/:achievementId', deleteAchievements);

module.exports = router;
