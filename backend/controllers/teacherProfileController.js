const TeacherProfile = require('../models/profile');
const upload = require('../config/multerConfig')
const multer = require('multer');


const uploadProfileImage = upload.single('profileImage');

exports.addProfile = async (req, res) =>
{
    try
    {
        // Use multer middleware for file upload
        uploadProfileImage(req, res, async function (err)
        {
            if (err instanceof multer.MulterError)
            {
                // A Multer error occurred when uploading
                return res.status(400).json({
                    message: `Image upload error: ${err.message}`,
                    success: false
                });
            } else if (err)
            {
                // An unknown error occurred
                return res.status(400).json({
                    message: `Error: ${err.message}`,
                    success: false
                });
            }

            // Get form data
            const { name, lecturerEmail, spcialization, bio, department } = req.body;

            // Create profile data object
            const profileData = {
                name,
                lecturerEmail,
                spcialization,
                bio,
                department
            };

            // Add profile image path if file was uploaded
            if (req.file)
            {
                profileData.profileImage = `/uploads/profile-images/${req.file.filename}`;
            }

            // Create teacher profile
            const teacherProfile = await TeacherProfile.create(profileData);

            res.status(200).json({
                message: "Profile details added successfully",
                success: true,
                data: teacherProfile
            });
        });
    } catch (error)
    {
        console.error('Profile creation error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

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