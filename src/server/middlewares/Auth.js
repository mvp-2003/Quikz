const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const authenticateUser = (req, res, next) => {
    console.log(req.body);
    const token = req.header('Authorization')?.replace('Bearer ','');
    
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Access denied. No token provided.');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).send('Invalid token.');
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateUser;