const mongoose = require('mongoose');

// Badge Schema
const badgeSchema = new mongoose.Schema({
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
  icon: {
    type: String, // URL or path to badge icon
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = { Badge };
