const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");


// Attendance Page
router.get(
    "/attendance",
    attendanceController.attendancePage
);


// Add Attendance
router.post(
    "/attendance",
    attendanceController.addAttendance
);


// Attendance List
router.get(
    "/attendanceList",
    attendanceController.attendanceList
);


module.exports = router;