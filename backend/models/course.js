// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    lecturerEmail: { type: String, required: true },
    imageUrl: { type: String, required: true },
    topicOne: { type: String, required: true },
    topicTwo: { type: String },
    smallDescription: { type: String, required: true },
    fullDescription: { type: String },
    lessonsQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
