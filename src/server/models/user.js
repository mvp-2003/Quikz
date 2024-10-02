const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        }
    }
);

userSchema.methods.generateAccessToken = function (secretKey) {
    try {
        const token = jwt.sign(
            {
                role: "user",
                id: this._id
            },
            secretKey,
            {
                expiresIn: 60 * 60 * 24 * 30,
            }
        );
        return token;
    } catch (err) {
        console.log(`Error creating JWT token`, err);
        process.exit(1);
    }
};

module.exports = mongoose.model("User", userSchema);