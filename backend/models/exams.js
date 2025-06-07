const mongoose = require('mongoose');

const essayQuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true
    },
    marks: {
        type: Number,
        required: true,
        min: 0
    },
    instructions: {
        type: String,
        trim: true
    },
    questionOrder: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    totalMarks: {
        type: Number,
        required: true,
        min: 0
    },
    instructions: {
        type: String,
        trim: true
    },
    essayQuestions: [essayQuestionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    examDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for better query performance
examSchema.index({ title: 1, subject: 1 });
examSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Exam', examSchema);