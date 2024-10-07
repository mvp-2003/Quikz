const dotenv = require('dotenv');
const mongoose = require('mongoose');
const StatusCodes = require('http-status-codes');
const { User } = require('../models/user');
const { Badge } = require('../models/badge');

dotenv.config();
const admin = process.env.admin;

const fetchBadges = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User ID not found' });
    }

    const userBadges = await User.findById(userId).populate(
      'badges.badgeId'
    );
    if (!userBadges) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ badges: userBadges.badges });
  } catch (err) {
    console.error('Error while fetching Badges: ', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};


const awardBadge = async (req, res) => {
  try {
    const { email } = req.body;
    if (email != admin)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'You are not the admin' });
        
    const { userId, badgeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(badgeId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid badge ID' });
    }

    const badge = await Badge.findById(badgeId);

    if (!badge) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Badge not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid user ID' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User not found' });
    }

    const alreadyAwarded = user.badges.some(
      (ach) => ach.badgeId.toString() === badgeId
    );

    if (alreadyAwarded) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User already has this badge' });
    }

    user.badges.push({
      badgeId: badgeId,
      achievedAt: new Date(),
    });

    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Badge awarded', badges: user.badges });
  } catch (err) {
    console.error('Error while awarding Badge: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Server error' });
  }
};

const deleteBadge = async (req, res) => {
  try {
    const { email } = req.body;
    const { userId, badgeId } = req.params;
    if (email != admin)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'You are not the admin' });

    if (!mongoose.Types.ObjectId.isValid(badgeId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid badge ID' });
    }

    const badge = await Badge.findById(badgeId);

    if (!badge) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Badge not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid user ID' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User not found' });
    }

    const badgeIndex = user.badges.findIndex(
      (ach) => ach.badgeId.toString() === badgeId
    );

    if (badgeIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Badge not found for the user' });
    }

    user.badges.splice(badgeIndex, 1);

    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Badge removed', badges: user.badges });
  } catch (err) {
    console.error('Error while deleting Badge: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Server error' });
  }
};

module.exports = { fetchBadges, awardBadge, deleteBadge };