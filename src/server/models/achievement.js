const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  criteria: {
    type: String, // Description of the conditions to earn the badge
    required: true,
  },
  count: {
    type: Number, // Times a certain Criteria be met
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = { Achievement };
