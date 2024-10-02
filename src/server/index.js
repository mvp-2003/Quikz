// Import Libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Database
const { connectDB, disconnectDB } = require('./db/connect');

// Configure Env Variables
dotenv.config();

let port = process.env.PORT || 5500;
const mongoURI = process.env.MONGO_URI;

const app = express();

// Middleware for CORS and JSON Parsing
app.use(cors());
app.use(express.json());

// Import Routes
const routes = require('./routes');

// Routing Setup
app.use('/', routes);

// Root Route
app.get("/", (req, res) => {
    res.send("Quikz: Hello World!");
});

const start = async () => {
    try {
        // Check if required environment variables are set
        if (!mongoURI) {
            console.error('MONGO_URI environment variable is not set.');
            process.exit(1);
        }

        await connectDB(mongoURI);
        app.listen(port, () => {
            console.log(`Server is listening to port ${port} happily`);
            console.log(`GO Live: http://localhost:${port}/`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

// Start the Server
start();

// Shut Down on SIGINT signal
process.on('SIGINT', () => {
    console.log('Shutting down gracefully');

    try {
        disconnectDB();
    } catch (err) {
        console.error("Error disconnecting mongoDB", err);
    }

    process.exit(0);
});
