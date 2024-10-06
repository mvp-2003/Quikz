const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('./user');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options: [String],
            correctOption: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Quiz', quizSchema);