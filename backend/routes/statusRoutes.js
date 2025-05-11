const express = require('express');
const { updateBookingStatus } = require('../controllers/bookingController');
const router = express.Router();

router.put('/updateBookingStatus/:id', updateBookingStatus)

module.exports = router;