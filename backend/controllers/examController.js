const Exam = require('../models/exams');

// Create a new exam
exports.saveExam = async (req, res) =>
{
    try
    {
        const {
            title,
            subject,
            duration,
            instructions,
            essays,
            examDate
        } = req.body;

        const totalMarks = essays.reduce((sum, essay) => sum + parseInt(essay.marks), 0);

        const essayQuestions = essays.map((essay, index) => ({
            questionText: essay.question,
            marks: parseInt(essay.marks),
            instructions: essay.instructions || '',
            questionOrder: index + 1
        }));

        const newExam = new Exam({
            title,
            subject,
            duration: parseInt(duration),
            totalMarks,
            instructions: instructions || '',
            essayQuestions,
            createdBy: req.user.id,
            examDate: examDate ? new Date(examDate) : null
        });

        const savedExam = await newExam.save();

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
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
};

// Get all exams for a user
exports.getExams = async (req, res) =>
{
    try
    {
        const { page = 1, limit = 10, subject, status } = req.query;

        const query = {
            createdBy: req.user.id,
            isActive: true
        };

        if (subject) query.subject = { $regex: subject, $options: 'i' };
        if (status) query.status = status;

        const exams = await Exam.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('createdBy', 'name email');

        const total = await Exam.countDocuments(query);

        res.status(200).json({
            success: true,
            data: exams,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });

    } catch (error)
    {
        console.error('Error fetching exams:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getAllExams = async (req, res) =>
{
    try
    {
        const exams = await Exam.find()
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            data: exams
        });
    } catch (error)
    {
        console.error('Error fetching all exams:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// Get single exam by ID
exports.getExamById = async (req, res) =>
{
    try
    {
        const examId = req.params.id;

        const exam = await Exam.findOne({
            _id: examId,
            createdBy: req.user.id,
            isActive: true
        }).populate('createdBy', 'name email');

        if (!exam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        res.status(200).json({
            success: true,
            data: exam
        });

    } catch (error)
    {
        console.error('Error fetching exam:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getExamByIdUserDetails = async (req, res) =>
{
    try
    {
        const examId = req.params.id;

        const exam = await Exam.findOne({
            _id: examId,
            isActive: true
        }).populate('createdBy', 'name email');

        if (!exam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        res.status(200).json({
            success: true,
            data: exam
        });

    } catch (error)
    {
        console.error('Error fetching exam:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// Update exam
exports.updateExam = async (req, res) =>
{
    try
    {
        const examId = req.params.id;
        const {
            title,
            subject,
            duration,
            instructions,
            essays,
            status,
            examDate
        } = req.body;

        const totalMarks = essays.reduce((sum, essay) => sum + parseInt(essay.marks), 0);

        const essayQuestions = essays.map((essay, index) => ({
            questionText: essay.question,
            marks: parseInt(essay.marks),
            instructions: essay.instructions || '',
            questionOrder: index + 1
        }));

        const updatedExam = await Exam.findOneAndUpdate(
            { _id: examId, createdBy: req.user.id },
            {
                title,
                subject,
                duration: parseInt(duration),
                totalMarks,
                instructions: instructions || '',
                essayQuestions,
                status,
                examDate: examDate ? new Date(examDate) : null
            },
            { new: true, runValidators: true }
        );

        if (!updatedExam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found or you do not have permission to update it'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exam updated successfully',
            data: updatedExam
        });

    } catch (error)
    {
        console.error('Error updating exam:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Delete exam (soft delete)
exports.deleteExam = async (req, res) =>
{
    try
    {
        const examId = req.params.id;

        const deletedExam = await Exam.findOneAndUpdate(
            { _id: examId, createdBy: req.user.id },
            { isActive: false },
            { new: true }
        );

        if (!deletedExam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found or you do not have permission to delete it'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exam deleted successfully'
        });

    } catch (error)
    {
        console.error('Error deleting exam:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Publish exam
exports.publishExam = async (req, res) =>
{
    try
    {
        const examId = req.params.id;

        const exam = await Exam.findOneAndUpdate(
            { _id: examId, createdBy: req.user.id },
            { status: 'published' },
            { new: true }
        );

        if (!exam)
        {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exam published successfully',
            data: exam
        });

    } catch (error)
    {
        console.error('Error publishing exam:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
