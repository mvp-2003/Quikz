const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        badges: [{
            badgeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Badge',
            },
            achievedAt: {
                type: Date,
                default: Date.now,
            },
        }],
        achievements: [{
            achievementId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Achievement',
            },
            achievedAt: {
                type: Date,
                default: Date.now,
            },
        }],
    },
    {
        timestamps: true,
    }
);
userSchema.methods.generateAccessToken = function (secretKey) {
    try {
        const token = jwt.sign(
            {
                role: 'user',
                id: this._id
            },
            secretKey,
            {
                expiresIn: 60 * 60 * 24 * 30,
            }
        );
        return token;
    } catch (err) {
        console.log('Error creating JWT token', err);
        process.exit(1);
    }
};

const User = mongoose.model('User', userSchema);
module.exports = {
    User
}