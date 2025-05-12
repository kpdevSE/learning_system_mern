const Assessment = require('../models/assessments');

// Create Assessment with optional PDF upload
exports.createAssessment = async (req, res) =>
{
    try
    {
        const {
            title,
            description,
            type,
            difficulty,
            totalMarks,
            dueDate,
            autoGrading,
            course,
            createdBy
        } = req.body;

        let pdfFile = null;

        if (req.file)
        {
            pdfFile = {
                fileId: req.file.filename,
                fileName: req.file.originalname,
                fileUrl: `/uploads/pdfs/${req.file.filename}` // or use absolute URL if hosted
            };
        }

        const assessment = new Assessment({
            title,
            description,
            type,
            difficulty,
            totalMarks,
            dueDate,
            pdfFile,
            autoGrading,
            course,
            createdBy
        });

        await assessment.save();
        res.status(201).json({ message: 'Assessment created successfully', assessment });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

