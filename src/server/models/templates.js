const mongoose = require('mongoose');

const quizTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [String],
      correctOption: {
        type: String,
        required: true,
      },
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuizTemplate = mongoose.model('QuizTemplate', quizTemplateSchema);

module.exports = QuizTemplate;