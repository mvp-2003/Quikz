const express = require('express');
const router = express.Router();
const {
  fetchBadges,
  awardBadge,
  deleteBadge,
} = require('../controllers/userBadgeController');
const authenticate = require('../middlewares/Auth');

router.get('/:userId', authenticate, fetchBadges);
router.post('/:userId/:badgeId', authenticate, awardBadge);
router.delete('/:userId/:badgeId', authenticate, deleteBadge);

module.exports = router;
