const { Achievement } = require('../models/achievement');
const dotenv = require('dotenv');
const StatusCodes = require('http-status-codes');
dotenv.config();
const admin = process.env.admin;

const fetchAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    return res.status(StatusCodes.OK).json({ achievements });
  } catch (err) {
    console.log('Error while fetching Achievements: ', err);
    process.exit(1);
  }
};

const fetchAchievement = async (req, res) => {
  try {
    const achievementId = req.params.achievementId;
    const achievement = await Achievement.findById(achievementId);
    return res.status(StatusCodes.OK).json({ achievement });
  } catch (err) {
    console.log('Error while finding Achievement: ', err);
    process.exit(1);
  }
};

const createAchievements = async (req, res) => {
  try {
    const { email } = req.body;
    if (email != admin)
      return res.status(400).json({
        msg: 'You are Not the admin',
      });

    const { name, description, criteria, count, icon } = req.body;

    if (!name || !criteria || !count)
      return res.status(400).json({
        msg: 'Invalid Body',
      });

    const achievement = { name, description, criteria, count, icon };
    await Achievement.create({ ...achievement });
    return res.json({
      msg: 'Create Success',
    });
  } catch (err) {
    console.log('Error Logging in', err);
    process.exit(1);
  }
};

const deleteAchievements = async (req, res) => {
  try {
    const achievementId = req.params.achievementId;
    const { email } = req.body;

    if (email !== admin) {
      return res.status(400).json({
        msg: 'You are Not the admin',
      });
    }

    if (!achievementId) {
      return res.status(400).json({
        msg: 'Invalid Body: Achievement ID is required',
      });
    }

    const achievement = await Achievement.findByIdAndDelete(achievementId);

    if (!achievement) {
      return res.status(404).json({
        msg: 'Achievement not found',
      });
    }

    return res.json({
      msg: 'Achievement deleted successfully',
    });
  } catch (err) {
    console.log('Error deleting achievement', err);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

module.exports = {
  fetchAchievements,
  fetchAchievement,
  createAchievements,
  deleteAchievements,
};
