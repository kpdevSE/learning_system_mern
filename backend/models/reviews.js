const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    lecturerEmail: {
        type: String,
        required: [true, 'Lecturer email is required'],
        trim: true
    },
    loggedUserEmail: {
        type: String,
        required: [true, 'User email is required'],
        trim: true
    },
    loggedUserName: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    starCount: {
        type: Number,
        required: [true, 'Star rating is required'],
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: [true, 'Review description is required'],
        trim: true
    },
    profileImage: {
        type: String,
        default: 'default-profile.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the 'updatedAt' field on save
ReviewSchema.pre('save', function (next)
{
    this.updatedAt = Date.now();
    next();
});



module.exports = mongoose.model('Review', ReviewSchema);