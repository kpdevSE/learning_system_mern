const Exam = require('../models/exams');

// Create a new exam
const createExam = async (req, res) =>
{
    try
    {
        const {
            title,
            description,
            questions,
            course,
            startTime,
            endTime,
            duration
        } = req.body;

        // Validate required fields
        if (!title || !questions || !course || !startTime || !endTime || !duration)
        {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Create new exam
        const exam = new Exam({
            title,
            description,
            questions,
            course,
            startTime,
            endTime,
            duration,
            createdBy: req.user._id, // Assuming user is authenticated and available in req.user
            status: 'draft'
        });

        // Save exam to database
        const savedExam = await exam.save();

        res.status(201).json({
            success: true,
            message: 'Exam created successfully',
            data: savedExam
        });

    } catch (error)
    {
        console.error('Error creating exam:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating exam',
            error: error.message
        });
    }
};

// Delete an exam
const deleteExam = async (req, res) =>
{
    try
    {
        const { examId } = req.params;

        // Find and delete the exam
        const exam = await Exam.findById(examId);

        if (!exam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        // Check if the user is authorized to delete the exam
        if (exam.createdBy.toString() !== req.user._id.toString())
        {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this exam'
            });
        }

        // Instead of actually deleting, we'll set isActive to false (soft delete)
        exam.isActive = false;
        await exam.save();

        res.status(200).json({
            success: true,
            message: 'Exam deleted successfully'
        });

    } catch (error)
    {
        console.error('Error deleting exam:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting exam',
            error: error.message
        });
    }
};

// Hard delete an exam (if needed)
const hardDeleteExam = async (req, res) =>
{
    try
    {
        const { examId } = req.params;

        const exam = await Exam.findById(examId);

        if (!exam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        // Check if the user is authorized to delete the exam
        if (exam.createdBy.toString() !== req.user._id.toString())
        {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this exam'
            });
        }

        // Actually delete the exam from database
        await Exam.findByIdAndDelete(examId);

        res.status(200).json({
            success: true,
            message: 'Exam permanently deleted'
        });

    } catch (error)
    {
        console.error('Error hard deleting exam:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting exam',
            error: error.message
        });
    }
};

// Get all exams with filtering options
const getAllExams = async (req, res) =>
{
    try
    {
        const {
            course,
            status,
            createdBy,
            isActive = true, // Default to only active exams
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build filter object
        const filter = { isActive };

        if (course) filter.course = course;
        if (status) filter.status = status;
        if (createdBy) filter.createdBy = createdBy;

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Get exams with pagination and sorting
        const exams = await Exam.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('course', 'name code') // Populate course details
            .populate('createdBy', 'name email'); // Populate creator details

        // Get total count for pagination
        const total = await Exam.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: exams,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });

    } catch (error)
    {
        console.error('Error fetching exams:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching exams',
            error: error.message
        });
    }
};

// Get exams for a specific course
const getCourseExams = async (req, res) =>
{
    try
    {
        const { courseId } = req.params;
        const { status, isActive = true } = req.query;

        const filter = {
            course: courseId,
            isActive
        };

        if (status) filter.status = status;

        const exams = await Exam.find(filter)
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            data: exams
        });

    } catch (error)
    {
        console.error('Error fetching course exams:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching course exams',
            error: error.message
        });
    }
};

// Get exams created by a specific user
const getUserExams = async (req, res) =>
{
    try
    {
        const { userId } = req.params;
        const { status, isActive = true } = req.query;

        const filter = {
            createdBy: userId,
            isActive
        };

        if (status) filter.status = status;

        const exams = await Exam.find(filter)
            .sort({ createdAt: -1 })
            .populate('course', 'name code');

        res.status(200).json({
            success: true,
            data: exams
        });

    } catch (error)
    {
        console.error('Error fetching user exams:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user exams',
            error: error.message
        });
    }
};

module.exports = {
    createExam,
    deleteExam,
    hardDeleteExam,
    getAllExams,
    getCourseExams,
    getUserExams
};
