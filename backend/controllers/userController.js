const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
exports.getCurrentUser = async (req, res) =>
{
    try
    {
        const user = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        };

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error)
    {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
exports.updateUserProfile = async (req, res) =>
{
    try
    {
        const { name, email } = req.body;

        // Fields to update
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;

        // Update user
        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateFields,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error)
    {
        console.error('Update user profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Students Count

// controller/userController.js
exports.getStudentCount = async (req, res) =>
{
    try
    {
        const count = await User.countDocuments({ role: 'student' });
        res.status(200).json({ success: true, total: count });
    } catch (error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
};

