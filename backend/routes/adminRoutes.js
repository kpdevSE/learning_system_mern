const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Use auth middleware for all admin routes
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.route('/users')
    .post(createUser)
    .get(getUsers);

router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;