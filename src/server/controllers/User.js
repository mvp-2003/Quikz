// userController.js

// Get users with pagination
const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page number from query parameters, default to 1
        const limit = parseInt(req.query.limit) || 10;  // Get the limit from query parameters, default to 10

        // Logic to fetch users with pagination would go here
        // For example, you might retrieve users from a database here.

        res.json({
            message: 'List of users',
            page: page,
            limit: limit,
            // Add the user data here (e.g., users.slice((page - 1) * limit, page * limit))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Logic to create a user would go here
        // For example, you might save the user in a database here.

        res.json({ message: 'User created successfully', data: { name, email } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;  // Extract the user ID from the URL

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Logic to get user by ID would go here
        // For example, you might retrieve the user from a database here.

        res.json({ message: `Fetched user with ID: ${userId}` });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;  // Extract the user ID from the URL
        const userData = req.body;     // Extract data to update from the request body

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!userData.name && !userData.email) {
            return res.status(400).json({ message: 'At least one field (name or email) is required to update' });
        }

        // Logic to update user by ID would go here
        // For example, you might update the user in the database here.

        res.json({ message: `Updated user with ID: ${userId}`, data: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;  // Extract the user ID from the URL

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Logic to delete user by ID would go here
        // For example, you might delete the user from the database here.

        res.json({ message: `Deleted user with ID: ${userId}` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
