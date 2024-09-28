// Import Libraries
const express = require('express');
const cors = require('cors');

let port = process.env.PORT || 5500;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Quikz");
});

const start = async () => {
    try {
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
    process.exit(0);
});