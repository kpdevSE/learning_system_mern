const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, 'uploads/profile-images/');  // Make sure this directory exists
    },
    filename: function (req, file, cb)
    {
        // Create unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'profile-' + uniqueSuffix + ext);
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) =>
{
    if (file.mimetype.startsWith('image/'))
    {
        cb(null, true);
    } else
    {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

// Create the multer instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});


module.exports = upload;