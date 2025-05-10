const mongoose = require('mongoose');

const PDFSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'PDF title is required'],
        trim: true,
        maxlength: [100, 'PDF title cannot be more than 100 characters']
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PDF', PDFSchema);