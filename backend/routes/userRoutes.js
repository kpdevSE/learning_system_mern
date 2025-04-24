const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Protected routes
router.use(protect);

router.get('/me', getCurrentUser);
router.put('/me', updateUserProfile);

module.exports = router;