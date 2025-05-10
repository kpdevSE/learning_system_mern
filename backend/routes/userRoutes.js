const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserProfile, getStudentCount } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { getteacherProfile, addProfile } = require('../controllers/teacherProfileController');
const { createCourse, getallCoursesByEmail, getallCourses, getCourseById, deleteCourseById, updateCourseById, getCourseDetailsForStudents, getCoursesCount } = require('../controllers/courseController');
const { addProfileStudent, getStudentProfile } = require('../controllers/studentProfileController');
const { makePayment, getAllCoursesByPurchasingEmail, getPayementCountToLecturer } = require('../controllers/payementController');
const { getNotificationsByRole, sendNotification, getStudentNotificationCount, getteachersNotificationsCount } = require('../controllers/notificationsController');
const { uploadPDF, getAllPDFs, deletePDF } = require('../controllers/pdfController');


// Protected routes
router.use(protect);

// Users
router.get('/me', getCurrentUser);
router.put('/me', updateUserProfile);
router.post('/profile', addProfile)
router.get('/details', getteacherProfile)
router.post('/student/profile', addProfileStudent)
router.get('/student/details', getStudentProfile)
router.get('/student/count', getStudentCount)

// Courses
router.post('/create', createCourse)
router.get('/mycourses', getallCoursesByEmail)
router.get('/allcourses', getallCourses)
router.get('/courses/:id', getCourseById);
router.delete('/courses/:id', deleteCourseById);
router.put('/courses/:id', updateCourseById)
router.get('/studentcourses/:id', getCourseDetailsForStudents)
router.get('/coursecount/count', getCoursesCount)

// Payement
router.post('/payement', makePayment)
router.get('/purchased/courses', getAllCoursesByPurchasingEmail)
router.get('/countofpayement', getPayementCountToLecturer)


// Notifications
router.get('/getnotifications', getNotificationsByRole)
router.post('/savenotification', sendNotification)
router.get('/notificationcount', getStudentNotificationCount);
router.get('/teachernotificationcount', getteachersNotificationsCount);

// PDF
router.post('/uploadpdf', uploadPDF);
router.get('/pdfall', getAllPDFs);
router.delete('/pdf/:filename', deletePDF);

module.exports = router;