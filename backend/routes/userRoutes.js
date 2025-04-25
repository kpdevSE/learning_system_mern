const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserProfile, getStudentCount } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { addprofile, getteacherProfile } = require('../controllers/teacherProfileController');
const { createCourse, getallCoursesByEmail, getallCourses, getCourseById, deleteCourseById, updateCourseById } = require('../controllers/courseController');


// Protected routes
router.use(protect);

router.get('/me', getCurrentUser);
router.put('/me', updateUserProfile);
router.post('/profile', addprofile)
router.get('/details', getteacherProfile)
router.get('/student/count', getStudentCount)

// Courses
router.post('/create', createCourse)
router.get('/mycourses', getallCoursesByEmail)
router.get('/allcourses', getallCourses)
router.get('/courses/:id', getCourseById);
router.delete('/courses/:id', deleteCourseById);
router.put('/courses/:id', updateCourseById)


module.exports = router;