const PDF = require('../models/pdf');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Define storage for uploaded PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        const uploadPath = 'uploads/';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath))
        {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb)
    {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Filter to ensure only PDFs are uploaded
const fileFilter = (req, file, cb) =>
{
    if (file.mimetype === 'application/pdf')
    {
        cb(null, true);
    } else
    {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Initialize multer upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('pdf');

// Upload PDF controller
exports.uploadPDF = (req, res) =>
{
    upload(req, res, async (err) =>
    {
        if (err)
        {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (!req.file)
        {
            return res.status(400).json({
                success: false,
                message: 'Please upload a PDF file'
            });
        }

        if (!req.body.title)
        {

            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: 'PDF title is required'
            });
        }

        try
        {

            const newPDF = new PDF({
                title: req.body.title,
                filename: req.file.filename,
                path: req.file.path,
                uploadDate: Date.now(),
                loggedEmail: req.body.loggedEmail
            });

            await newPDF.save();

            res.status(201).json({
                success: true,
                message: 'PDF uploaded successfully',
                data: {
                    id: newPDF._id,
                    title: newPDF.title,
                    filename: newPDF.filename,
                    uploadDate: newPDF.uploadDate
                }
            });
        } catch (error)
        {

            fs.unlinkSync(req.file.path);
            res.status(500).json({
                success: false,
                message: 'Error saving PDF to database',
                error: error.message
            });
        }
    });
};

// Get all PDFs controller
exports.getAllPDFs = async (req, res) =>
{
    try
    {
        const pdfs = await PDF.find().select('title filename uploadDate');

        res.status(200).json({
            success: true,
            count: pdfs.length,
            data: pdfs
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Error retrieving PDFs',
            error: error.message
        });
    }
};
// Get pdf by email
exports.getAllPDFsByEmail = async (req, res) =>
{
    try
    {
        const email = req.user.email; // Assumes email is added to req.user via middleware (e.g. JWT auth)

        const pdfs = await PDF.find({ loggedEmail: email }).select('title filename uploadDate');

        res.status(200).json({
            success: true,
            count: pdfs.length,
            data: pdfs
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Error retrieving PDFs',
            error: error.message
        });
    }
};

// Get PDF by ID controller
exports.getPDFById = async (req, res) =>
{
    try
    {
        const pdf = await PDF.findById(req.params.id);

        if (!pdf)
        {
            return res.status(404).json({
                success: false,
                message: 'PDF not found'
            });
        }

        res.status(200).json({
            success: true,
            data: pdf
        });
    } catch (error)
    {
        if (error.kind === 'ObjectId')
        {
            return res.status(400).json({
                success: false,
                message: 'Invalid PDF ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error retrieving PDF',
            error: error.message
        });
    }
};

// Download PDF controller
exports.downloadPDF = async (req, res) =>
{
    try
    {
        const pdf = await PDF.findById(req.params.id);

        if (!pdf)
        {
            return res.status(404).json({
                success: false,
                message: 'PDF not found'
            });
        }

        // Check if file exists
        if (!fs.existsSync(pdf.path))
        {
            return res.status(404).json({
                success: false,
                message: 'PDF file not found on server'
            });
        }

        // Set headers and send file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdf.filename}`);

        const filestream = fs.createReadStream(pdf.path);
        filestream.pipe(res);
    } catch (error)
    {
        if (error.kind === 'ObjectId')
        {
            return res.status(400).json({
                success: false,
                message: 'Invalid PDF ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error downloading PDF',
            error: error.message
        });
    }
};

// Delete PDF controller
exports.deletePDF = async (req, res) =>
{
    try
    {
        const pdf = await PDF.findById(req.params.id);

        if (!pdf)
        {
            return res.status(404).json({
                success: false,
                message: 'PDF not found'
            });
        }

        // Delete file from server if it exists
        if (fs.existsSync(pdf.path))
        {
            fs.unlinkSync(pdf.path);
        }

        // Delete record from database
        await PDF.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'PDF deleted successfully'
        });
    } catch (error)
    {
        if (error.kind === 'ObjectId')
        {
            return res.status(400).json({
                success: false,
                message: 'Invalid PDF ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting PDF',
            error: error.message
        });
    }
};