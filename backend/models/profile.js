const mongoose = require('mongoose')

const teacherProfile = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Name is required'],
            trim: true
        },
        lecturerEmail: { type: String, required: true },
        spcialization: {
            type: String,
            require: [true, "Please give a feild"]
        },
        bio: {
            type: String,
            require: [true, "Please give a Bio"]
        },
        department: {
            type: String,
            require: [true, "Department is required"]
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("TeacherProfile", teacherProfile);