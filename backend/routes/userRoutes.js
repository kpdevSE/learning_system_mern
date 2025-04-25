const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserProfile, getStudentCount } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { addprofile, getteacherProfile } = require('../controllers/teacherProfileController');
const { createCourse, getallCoursesByEmail, getallCourses } = require('../controllers/courseController');


// Protected routes
router.use(protect);

router.get('/me', getCurrentUser);
router.put('/me', updateUserProfile);
router.post('/profile', addprofile)
router.get('/details', getteacherProfile)
router.get('/student/count', getStudentCount)
router.post('/create', createCourse)
router.get('/mycourses', getallCoursesByEmail)
router.get('/allcourses', getallCourses)

module.exports = router;