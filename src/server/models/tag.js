const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
