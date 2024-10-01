const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url);
};

const disconnectDB = () => {
    mongoose.connection.close((err) => {
        if (err) {
            console.error('Error closing MongoDB connection:', err);
        } else {
            console.log('MongoDB connection closed successfully');
        }
    });
};

module.exports = { connectDB, disconnectDB };