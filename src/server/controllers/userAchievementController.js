const dotenv = require('dotenv');
const mongoose = require('mongoose');
const StatusCodes = require('http-status-codes');
const { User } = require('../models/user');
const { Achievement } = require('../models/achievement');

dotenv.config();
const admin = process.env.admin;

const fetchAchievements = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User ID not found' });
    }

    const userAchievements = await User.findById(userId).populate(
      'achievements.achievementId'
    );
    if (!userAchievements) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ achievements: userAchievements.achievements });
  } catch (err) {
    console.error('Error while fetching Achievements: ', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};


const awardAchievement = async (req, res) => {
  try {
    const { userId, achievementId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(achievementId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid achievement ID' });
    }

    const achievement = await Achievement.findById(achievementId);

    if (!achievement) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Achievement not found' });
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

    const alreadyAwarded = user.achievements.some(
      (ach) => ach.achievementId.toString() === achievementId
    );

    if (alreadyAwarded) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User already has this achievement' });
    }

    user.achievements.push({
      achievementId: achievementId,
      achievedAt: new Date(),
    });

    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Achievement awarded', achievements: user.achievements });
  } catch (err) {
    console.error('Error while awarding Achievement: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Server error' });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const { email } = req.body;
    const { userId, achievementId } = req.params;
    if (email != admin)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'You are not the admin' });

    if (!mongoose.Types.ObjectId.isValid(achievementId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid achievement ID' });
    }

    const achievement = await Achievement.findById(achievementId);

    if (!achievement) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Achievement not found' });
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

    const achievementIndex = user.achievements.findIndex(
      (ach) => ach.achievementId.toString() === achievementId
    );

    if (achievementIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Achievement not found for the user' });
    }

    user.achievements.splice(achievementIndex, 1);

    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Achievement removed', achievements: user.achievements });
  } catch (err) {
    console.error('Error while deleting Achievement: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Server error' });
  }
};

module.exports = { fetchAchievements, awardAchievement, deleteAchievement };
