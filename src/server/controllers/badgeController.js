const { Badge } = require('../models/badge');
const dotenv = require('dotenv');
const StatusCodes = require("http-status-codes")
dotenv.config();
const admin = process.env.admin;

const fetchBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    return res.status(StatusCodes.OK).json({ badges });
  } catch (err) {
    console.log('Error while fetching Badges: ', err);
    process.exit(1);
  }
};

const fetchBadge = async (req, res) => {
  try {
    const badgeId = req.params.badgeId;
    const badge = await Badge.findById(badgeId);
    return res.status(StatusCodes.OK).json({ badge });
  } catch (err) {
    console.log('Error while finding Badge: ', err);
    process.exit(1);
  }
};

const createBadges = async (req, res) => {
  try {
    const { email } = req.body;
    if (email != admin)
      return res.status(400).json({
        msg: 'You are Not the admin',
      });
    
    const {name,description,criteria,count,icon} = req.body;

    if(!name || !criteria || !count)    
        return res.status(400).json({
        msg: 'Invalid Body'
        });

    const badge = {name, description,criteria,count,icon};
    await Badge.create({...badge})
    return res.json({
      msg: "Create Success"
    })

  } catch (err) {
    console.log('Error Logging in', err);
    process.exit(1);
  }
};

const deleteBadges = async (req, res) => {
  try {
    const badgeId  = req.params.badgeId
    const { email } = req.body;
    console.log(badgeId)
    if (email !== admin) {
      return res.status(400).json({
        msg: 'You are Not the admin',
      });
    }
    
    if (!badgeId) {
      return res.status(400).json({
        msg: 'Invalid Body: Badge ID is required',
      });
    }

    const badge = await Badge.findByIdAndDelete(badgeId);

    if (!badge) {
      return res.status(404).json({
        msg: 'Badge not found',
      });
    }

    return res.json({
      msg: 'Badge deleted successfully',
    });

  } catch (err) {
    console.log('Error deleting badge', err);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};



module.exports = { fetchBadges, fetchBadge, createBadges, deleteBadges };