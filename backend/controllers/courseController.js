// controllers/courseController.js
const Course = require('../models/course');

exports.createCourse = async (req, res) =>
{
    try
    {
        const {
            lecturerEmail,
            imageUrl,
            topicOne,
            topicTwo,
            smallDescription,
            fullDescription,
            lessonsQuantity,
            price,
            duration
        } = req.body;

        const course = new Course({
            lecturerEmail,
            imageUrl,
            topicOne,
            topicTwo,
            smallDescription,
            fullDescription,
            lessonsQuantity,
            price,
            duration,
        });

        await course.save();
        res.status(201).json({ success: true, message: "Course created", data: course });
    } catch (err)
    {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all Courses
exports.getallCourses = async (req, res) =>
{
    try
    {
        const courses = await Course.find()

        res.status(200).json(
            {
                message: "Courses get successfully",
                data: courses
            }
        )
    } catch (error)
    {
        res.status(500).json({ success: false, message: err.message });
    }
}

// Get Course by Creating Email
exports.getallCoursesByEmail = async (req, res) =>
{
    try
    {
        const email = req.user.email;
        const courses = await Course.find({ lecturerEmail: email });

        res.status(200).json(
            {
                message: "Courses get successfully",
                data: courses
            }
        )
    } catch (error)
    {
        res.status(500).json({ success: false, message: err.message });
    }
}

// Individual course details
exports.getCourseById = async (req, res) =>
{
    try
    {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if (!course)
        {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ data: course });
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
};

