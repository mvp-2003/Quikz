const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../controllers/User');

// Get users with pagination
router.get('/', getUsers);
// Create a user
router.post('/', createUser);
// Get user by ID
router.get('/:id', getUserById);
// Update user by ID
router.put('/:id', updateUserById);
// Delete user by ID
router.delete('/:id', deleteUserById);

module.exports = router;
