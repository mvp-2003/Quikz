const express = require('express');
const router=express.Router();
const { fetchBadges, awardBadge, deleteBadge } = require('../controllers/userBadgeController');

router.get('/:userId', fetchBadges);
router.post('/:userId/:badgeId', awardBadge);
router.delete('/:userId/:badgeId',deleteBadge);

module.exports = router;