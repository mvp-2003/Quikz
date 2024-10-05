const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const securePassword = async (password) => {
    try {
        let hashedPass = await bcrypt.hash(password, 10);
        return hashedPass;
    } catch (err) {
        console.log('Error Hashing password', err);
    }
};

// registerUser
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for null entries.
        if (!name || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send('All fields required');
        }

        // check if email already exists
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(StatusCodes.CONFLICT).send(`User with email ${oldUser} already exits.`);
        }

        // Create Hash Password to store in DB
        const hashedPass = await securePassword(password);

        // Create Entry Data
        const newData = { name, email, password: hashedPass };

        // Create User in DB
        const user = await User.create({ ...newData });

        // Generate AccessToken
        const accessToken = user.generateAccessToken(secretKey);

        return res.status(StatusCodes.CREATED).json({ user, accessToken });

    } catch (err) {
        console.log('Error registering a new User', err);
        process.exit(1);
    }
};

// loginUser
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send('ALL Fields Required');
        }

        const oldUser = await User.findOne({email});

        if (!oldUser) {
            res.status(StatusCodes.NO_CONTENT).send('Email Does not exist');
        }

        const isPassCorrect = await bcrypt.compare(password, oldUser.password);

        if (isPassCorrect) {

            const accessToken = oldUser.generateAccessToken(secretKey);
             
            return res.status(StatusCodes.OK).json({oldUser, accessToken});
        }

    } catch (err) {
        console.log('Error Logging in', err);
        process.exit(1);
    }
};

// emailVerification
const emailVerification = async (req, res) => {
    // TO DO: USE SMTP service.
    res.status(StatusCodes.OK).send('OK');
};

module.exports = { registerUser, loginUser, emailVerification };