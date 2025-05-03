const Notification = require('../models/notifications')


// Create and send a notification
exports.sendNotification = async (req, res) =>
{
    const { role, message } = req.body;

    if (!role || !message)
    {
        return res.status(400).json({ error: 'Role and message are required.' });
    }

    try
    {
        const newNotification = new Notification({ role, message });
        await newNotification.save();
        res.status(201).json({ success: true, notification: newNotification });
    } catch (error)
    {
        res.status(500).json({ error: 'Failed to send notification.' });
    }
};

exports.getNotificationsByRole = async (req, res) =>
{
    try
    {
        const notifications = await Notification.find();
        res.json({ success: true, notifications });
    } catch (error)
    {
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
};
