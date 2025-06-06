const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserProfile, getStudentCount, getAllStudentsFunction } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { getteacherProfile, addProfile, getteacherProfiles } = require('../controllers/teacherProfileController');
const { createCourse, getallCoursesByEmail, getallCourses, getCourseById, deleteCourseById, updateCourseById, getCourseDetailsForStudents, getCoursesCount } = require('../controllers/courseController');
const { addProfileStudent, getStudentProfile } = require('../controllers/studentProfileController');
const { makePayment, getAllCoursesByPurchasingEmail, getPayementCountToLecturer, getAllCoursesByLecturerEmail, getAllPayments } = require('../controllers/payementController');
const { getNotificationsByRole, sendNotification, getStudentNotificationCount, getteachersNotificationsCount } = require('../controllers/notificationsController');
const { getAllPDFs, deletePDF, getAllPDFsByEmail, uploadPDF } = require('../controllers/pdfController');
const { createReview, getLecturerReviews, getAllReviews, getLecturerReviewsDetails } = require('../controllers/reviewsController');
const { createBooking, getMyBookings, deleteBooking, getLecturerBookings, getLecturerBookingsByEmail, updateBookingStatus } = require('../controllers/bookingController');
const { createAssessment, getAllAssessments, deleteAssessment, } = require('../controllers/assessmentController');

const uploadPdfconfig = require('../config/uploadPFD');



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
router.get('/getpayementdetails', getAllCoursesByLecturerEmail)
router.get('/allpayments', getAllPayments)


// Notifications
router.get('/getnotifications', getNotificationsByRole)
router.post('/savenotification', sendNotification)
router.get('/notificationcount', getStudentNotificationCount);
router.get('/teachernotificationcount', getteachersNotificationsCount);

// PDF
router.post('/uploadpdf', uploadPDF);
router.get('/pdfall', getAllPDFs);
router.delete('/pdf/:filename', deletePDF);
router.get('/pdfbyemail', getAllPDFsByEmail);

// Reviews
router.post('/addreviews', createReview);
router.get('/getreviewbyemail', getAllReviews)
router.get('/getreviewbyemail/:id', getLecturerReviewsDetails)

// Lecturer Profiles
router.get('/getteacherprofiles', getteacherProfiles)

// Booking 
router.post('/postbooking', createBooking);
router.get('/getbookings', getMyBookings);
router.delete('/deletebooking/:id', deleteBooking)
router.get('/getLecturerbookings', getLecturerBookingsByEmail)

// Assessments
router.post("/uploadassessments", uploadPdfconfig.single('pdfFile'), createAssessment);
router.get('/getassessments', getAllAssessments)
router.delete('/deleteassessment/:id', deleteAssessment)



module.exports = router;