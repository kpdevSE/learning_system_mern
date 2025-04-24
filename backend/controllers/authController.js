const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) =>
{
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
    );
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) =>
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

        // Ensure role is valid (prevent direct admin registration)
        const validRole = ['student', 'teacher'].includes(role) ? role : 'student';

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: validRole
        });

        res.status(201).json({
            message: 'User registered successfully',
            success: true
        });
    } catch (error)
    {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) =>
{
    try
    {
        const { email, password, role } = req.body;

        // Check for email and password
        if (!email || !password)
        {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user - explicitly select password field
        const user = await User.findOne({ email }).select('+password');

        // Check if user exists
        if (!user)
        {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if role matches
        if (user.role !== role)
        {
            return res.status(401).json({ message: `Invalid credentials for ${role} login` });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch)
        {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        // Return token and user info (excluding password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.json({
            success: true,
            token,
            user: userResponse
        });
    } catch (error)
    {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
