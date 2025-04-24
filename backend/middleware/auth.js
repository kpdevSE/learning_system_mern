const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
exports.protect = async (req, res, next) =>
{
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
    {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try
    {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

        // Find user by id
        const user = await User.findById(decoded.userId);

        if (!user)
        {
            return res.status(401).json({ message: 'User not found' });
        }

        // Set user in request
        req.user = user;
        next();
    } catch (error)
    {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }
};

// Role-based authorization middleware
exports.authorize = (...roles) =>
{
    return (req, res, next) =>
    {
        if (!roles.includes(req.user.role))
        {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};
