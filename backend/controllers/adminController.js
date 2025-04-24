const User = require('../models/User');

// @desc    Create a user (admin only)
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = async (req, res) =>
{
    try
    {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user (admin can create any role including other admins)
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error)
    {
        console.error('Admin create user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) =>
{
    try
    {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error)
    {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.params.id).select('-password');

        if (!user)
        {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error)
    {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) =>
{
    try
    {
        const { name, email, role } = req.body;

        // Fields to update
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (role) updateFields.role = role;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user)
        {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error)
    {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) =>
{
    try
    {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user)
        {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error)
    {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
