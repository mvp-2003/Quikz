const express = require('express');
const router = express.Router();

// Route for registering a user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password for security
        // Example  bcrypt.hash(password, 10);
        // Here, you can add the logic to store the user in the database
        
        // Simulating a successful registration
        res.json({ message: "User Registered Successfully", email });
    } catch (error) {
        // Simple error response
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
});

// Route for logging in a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Logic to authenticate the user (check email and password)
        // Simulating a successful login
        res.json({ message: "User Logged In" });
    } catch (error) {
        // Simple error response
        res.status(500).json({ message: "Login failed. Please check your credentials." });
    }
});

// Route for logging out a user
router.post("/logout", async (req, res) => {
    try {
        // Logic to log out the user (e.g., clearing session)
        res.json({ message: "User Logged Out Successfully" });
    } catch (error) {
        // Simple error response
        res.status(500).json({ message: "Logout failed. Please try again." });
    }
});

module.exports = router;
