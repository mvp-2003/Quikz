// Import Libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {Router }=  require("express");
// Import Modules
const {connectDB, disconnectDB} = require('./db/connect');

// Configure Env Variables.
dotenv.config();
let port = process.env.PORT || 5500;
const mongoURI = process.env.MONGO_URI;

// console.log("MONGODB URL ",mongoURI);
const app = express();
const router = Router();
const Userroute = require("./Routes/User");
const AuthRoute = require("./Routes/Auth");
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Quikz: Hello World!");
});
app.use(express.json()); // to parse application/json

app.use('/api/users', Userroute);
app.use('/api/auth',AuthRoute);


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
            console.log(`GO Live: http://localhost:${port}/`)
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

start();

// ShutDown on SIGINT signal.
process.on('SIGINT', () => {
    console.log('Shutting down gracefully');

    try {
        disconnectDB();
    } catch (err) {
        console.log("Error disconnecting mongoDB", err);
    }

    process.exit(0);
});