const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'uploads/pdfs/');
    },
    filename: (req, file, cb) =>
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) =>
{
    if (file.mimetype === 'application/pdf')
    {
        cb(null, true);
    } else
    {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// 🔥 THIS is what you should export
const uploadPdfconfig = multer({ storage, fileFilter });

module.exports = uploadPdfconfig;
