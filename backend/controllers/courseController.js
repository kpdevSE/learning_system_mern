// controllers/courseController.js
const Course = require('../models/course');

exports.createCourse = async (req, res) =>
{
    try
    {
        const {
            lecturerEmail,
            imageUrl,
            youtubeUrl,
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
            youtubeUrl,
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

// Delete Course 
// Delete course
exports.deleteCourseById = async (req, res) =>
{

    try
    {
        const courseId = req.params.id;
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse)
        {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
};

// Update Courses

// Update course
exports.updateCourseById = async (req, res) =>
{
    try
    {
        const courseId = req.params.id;
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCourse)
        {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
};

// Get CourseDetailsi to Students
exports.getCourseDetailsForStudents = async (req, res) =>
{
    try
    {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if (!course)
        {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({
            success: true,
            message: "Data get Successfully",
            data: course,
        });
    } catch (err)
    {
        console.error('Error fetching course:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}


// Courses Controller
exports.getCoursesCount = async (req, res) =>
{
    try
    {
        const count = await Course.countDocuments();
        console.log(count)
        res.status(200).json({ success: true, total: count });
    } catch (error)
    {
        console.error("Error in getCoursesCount:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};