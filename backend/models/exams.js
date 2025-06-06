const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['multiple-choice', 'essay', 'short-answer'],
        required: true
    },
    options: [{
        type: String,
        trim: true
    }],
    correctAnswer: {
        type: Number,
        required: function ()
        {
            return this.type === 'multiple-choice';
        }
    },
    points: {
        type: Number,
        required: true,
        min: 1
    }
});

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    questions: [questionSchema],
    totalPoints: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'completed'],
        default: 'draft'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Calculate total points before saving
examSchema.pre('save', function (next)
{
    if (this.questions && this.questions.length > 0)
    {
        this.totalPoints = this.questions.reduce((sum, question) => sum + question.points, 0);
    }
    next();
});

// Add index for better query performance
examSchema.index({ course: 1, status: 1 });
examSchema.index({ createdBy: 1, status: 1 });

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
