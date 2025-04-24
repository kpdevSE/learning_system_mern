const User = require('../models/User');

// Create initial admin user if not exists
const createAdminUser = async () =>
{
    try
    {
        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists)
        {
            await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Admin user created successfully');
        }
    } catch (error)
    {
        console.error('Error creating admin user:', error);
    }
};

module.exports = createAdminUser;