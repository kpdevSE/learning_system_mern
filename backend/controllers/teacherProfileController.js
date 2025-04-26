const TeacherProfile = require('../models/profile');

exports.addprofile = async (req, res) =>
{
    try
    {
        const { name, lecturerEmail, spcialization, bio, department } = req.body;

        const teacherProfile = await TeacherProfile.create(
            {
                name,
                lecturerEmail,
                spcialization,
                bio,
                department
            }
        );

        res.status(200).json(
            {
                message: "Profile details addedd successfuly",
                success: true,
                data: teacherProfile
            }
        )
    } catch (error)
    {
        console.error('Registration error:', error);
        res.status(500).json(
            {
                message: 'Server error', error: error.message
            }
        );
    }
}

exports.getteacherProfile = async (req, res) => 
{
    try
    {

        const email = req.user.email;
        const user = await TeacherProfile.findOne({ lecturerEmail: email });

        res.status(200).json(
            {
                success: true,
                data: user
            }
        )
    } catch (error)
    {
        console.error('Get current user error:', error);
        res.status(500).json(
            {
                message: 'Server error', error: error.message
            }
        );
    }
}