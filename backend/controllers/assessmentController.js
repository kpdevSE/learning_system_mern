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

        });

        await assessment.save();
        res.status(201).json({ message: 'Assessment created successfully', assessment });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }


};

// Get all assessments (all types)
exports.getAllAssessments = async (req, res) =>
{
    try
    {
        // Fetch all assessments
        const assessments = await Assessment.find().exec();

        if (!assessments || assessments.length === 0)
        {
            return res.status(404).json({ message: 'No assessments found' });
        }

        res.status(200).json({ message: 'Assessments fetched successfully', assessments });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteAssessment = async (req, res) =>
{
    try
    {
        const assesmentsId = req.params.id;

        const deletedAssessment = await Assessment.findByIdAndDelete(assesmentsId);

        if (!deletedAssessment)
        {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.status(200).json({ message: 'Assessment deleted successfully', deletedAssessment });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

