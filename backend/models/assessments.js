const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Assessment title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['quiz', 'exam', 'assignment', 'project'],
        required: [true, 'Assessment type is required']
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'pro'],
        required: [true, 'Difficulty level is required']
    },
    totalMarks: {
        type: Number,
        required: [true, 'Total marks is required'],
        min: [0, 'Total marks cannot be negative']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    pdfFile: {
        fileId: String,
        fileName: String,
        fileUrl: String
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    autoGrading: {
        type: Boolean,
        default: false
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },

    submissionCount: {
        type: Number,
        default: 0
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0
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

// Pre-save middleware to update the updatedAt field
assessmentSchema.pre('save', function (next)
{
    this.updatedAt = Date.now();
    next();
});

// Virtual for remaining days
assessmentSchema.virtual('remainingDays').get(function ()
{
    const now = new Date();
    const due = new Date(this.dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
});

// Method to check if assessment is overdue
assessmentSchema.methods.isOverdue = function ()
{
    const now = new Date();
    const due = new Date(this.dueDate);
    return now > due;
};

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;