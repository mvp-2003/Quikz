const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      option: String,
      votes: { type: Number, default: 0 },
    },
  ],
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const pollSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
