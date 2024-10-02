const express = require('express');
const router = express.Router();

let users = [];

// Route for registering a user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // if any one of the filed iss missing then status code 400
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // if user is already registed then dont allow to register with same email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // As You mentioned We dont need any Model Therefore Storing it in Temporry Array
        users.push({ name, email, hashedPassword });

        res.status(201).json({ message: "User Registered Successfully ", email });
    } catch (error) {
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
});

// Route for logging in a user
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    try {
        // email and password require before login
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Logic to authenticate the user
        const user = users.find(user => user.email === email);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.json({ message: "User Logged In" });
    } catch (error) {
        res.status(500).json({ message: "Login failed. Please try again." });
    }
});

// Route for logging out a user
router.post("/logout", (req, res) => {
    try {
        // Logic to log out the user (in a real app, you might clear session or token based on your authentication technique
        res.json({ message: "User Logged Out Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed. Please try again." });
    }
});

module.exports = router;
