const express = require('express');
const router = express.Router();
const {
  fetchBadge,
  fetchBadges,
  createBadges,
  deleteBadges,
} = require('../controllers/badgeController');

router.get('/', fetchBadges);
router.get('/:badgeId', fetchBadge);
router.post('/', createBadges);
router.delete('/:badgeId', deleteBadges);

module.exports = router;
