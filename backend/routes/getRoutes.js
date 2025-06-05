const express = require('express');
const { getAllStudentsFunction, getAllTeachersFunction } = require('../controllers/userController');
const router = express.Router();

router.get('/allstudents', getAllStudentsFunction)
router.get('/allteachers', getAllTeachersFunction)

module.exports = router;