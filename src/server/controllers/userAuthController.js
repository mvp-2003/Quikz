const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const securePassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.error('Error hashing password', err);
        throw new Error('Password hashing failed');
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send('All fields required');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).send(`User with email ${email} already exists.`);
        }

        const hashedPassword = await securePassword(password);
        const user = await User.create({ name, email, password: hashedPassword });
        const accessToken = user.generateAccessToken(secretKey);

        return res.status(StatusCodes.CREATED).json({ user, accessToken });
    } catch (err) {
        console.error('Error registering a new user', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error registering user');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send('All fields required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).send('Email does not exist');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Incorrect password');
        }

        const accessToken = user.generateAccessToken(secretKey);
        return res.status(StatusCodes.OK).json({ user, accessToken });
    } catch (err) {
        console.error('Error logging in', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error logging in');
    }
};

const emailVerification = async (req, res) => {
    // TODO: Implement email verification using SMTP service.
    res.status(StatusCodes.OK).send('OK');
};

module.exports = { registerUser, loginUser, emailVerification };
