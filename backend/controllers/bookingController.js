const Booking = require('../models/booking');


// Create a booking
exports.createBooking = async (req, res) =>
{
    try
    {
        const {
            lecturerId,
            lecturerName,
            lecturerEmail,
            department,
            date,
            time,
            topic,
            consultationType,
            platform
        } = req.body;

        // Get the logged-in user ID from auth middleware
        const studentId = req.user.id;
        const studentEmail = req.user.email;

        // Create new booking
        const booking = new Booking({
            student: studentId,
            lecturer: lecturerId,
            studentEmail,
            lecturerEmail,
            lecturerName,
            department,
            date,
            time,
            topic,
            consultationType,
            platform: platform || '',
            status: 'pending'
        });

        await booking.save();

        // Optional: Send email notifications
        try
        {
            // Send notification to lecturer (implementation depends on your email service)
            // sendEmailNotification(lecturerEmail, 'New Booking Request', 
            //   `You have a new consultation booking request from ${studentEmail} for ${date} at ${time}`);
        } catch (emailError)
        {
            console.error('Email notification error:', emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error)
    {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all bookings for the logged-in user (student)
exports.getMyBookings = async (req, res) =>
{
    try
    {
        const bookings = await Booking.find({ student: req.user.id })
            .sort({ date: 1, time: 1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all bookings for a lecturer
exports.getLecturerBookingsByEmail = async (req, res) =>
{
    try
    {
        const lecturerEmail = req.user.email; // or req.body.email / req.query.email, depending on your setup

        console.log("Lecturer Email:", lecturerEmail);

        const bookings = await Booking.find({ lecturerEmail: lecturerEmail })
            .sort({ date: 1, time: 1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// Update booking status (confirm/cancel)
exports.updateBookingStatus = async (req, res) =>
{
    try
    {
        const { status } = req.body;
        const bookingId = req.params.id;
        console.log("Booking ID:", bookingId);

        // Validate status
        if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status))
        {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        // Find the booking
        const booking = await Booking.findById(bookingId);
        console.log("Booking:", booking);

        if (!booking)
        {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Ensure the user is authorized to update the booking (either the student or lecturer)
        // if (
        //     booking.student.toString() !== req.user.id &&
        //     booking.lecturer.toString() !== req.user.id
        // )
        // {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Not authorized to update this booking'
        //     });
        // }

        // Special rule: only lecturers can confirm bookings
        // if (status === 'confirmed' && booking.lecturer.toString() !== req.user.id)
        // {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Only lecturers can confirm bookings'
        //     });
        // }

        // Update booking status
        booking.status = status;
        await booking.save();

        // Optional: Send email notification about status change
        try
        {
            // Email notification code commented out
        } catch (emailError)
        {
            console.error('Email notification error:', emailError);
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) =>
{
    try
    {
        const booking = await Booking.findById(req.params.id);

        if (!booking)
        {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user is authorized to delete the booking
        if (booking.student.toString() !== req.user.id)
        {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this booking'
            });
        }

        await booking.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Helper function for sending emails (uncomment and configure as needed)
// const sendEmailNotification = (to, subject, message) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });
//
//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to,
//     subject,
//     text: message
//   };
//
//   return transporter.sendMail(mailOptions);
// };