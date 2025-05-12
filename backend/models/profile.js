const mongoose = require('mongoose')
const teacherProfile = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Name is required'],
            trim: true
        },
        lecturerEmail: {
            type: String,
            required: true
        },
        spcialization: {
            type: String,
            require: [true, "Please give a field"]
        },
        bio: {
            type: String,
            require: [true, "Please give a Bio"]
        },
        department: {
            type: String,
            require: [true, "Department is required"]
        },
        profileImage: {
            type: String,
            default: ""
        },
        // New fields
        campus: {
            type: String,
            require: [true, "Campus is required"]
        },
        liveLocation: {
            type: String,
            require: [true, "Live location is required"]
        },
        mobileNumber: {
            type: String,
            require: [true, "Mobile number is required"]
        },
        birthday: {
            type: Date,
            require: [true, "Birthday is required"]
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            require: [true, "Gender is required"]
        },
        nicNumber: {
            type: String,
            require: [true, "NIC number is required"]
        },
        age: {
            type: Number,
            require: [true, "Age is required"]
        },
        educationLevel: {
            type: String,
            enum: ['Diploma Level', 'Higher Diploma', 'BSc Level', 'Masters', 'PhD Level'],
            require: [true, "Education level is required"]
        }
    }, {
    timestamps: true
})

module.exports = mongoose.model("TeacherProfile", teacherProfile);