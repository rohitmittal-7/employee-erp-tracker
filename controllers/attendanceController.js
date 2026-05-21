const attendanceModel = require("../models/attendanceModel");


// Attendance Page
exports.attendancePage = (req, res) => {

    attendanceModel.getEmployees((err, employees) => {

        if(err){
            console.log(err);
            return;
        }

        res.render("attendance/attendance", {
            employees
        });

    });

};


// Add Attendance
exports.addAttendance = (req, res) => {

    const { employee_id, date, status } = req.body;

    const data = [
        employee_id,
        date,
        status
    ];

    attendanceModel.addAttendance(data, (err) => {

        if(err){
            console.log(err);
            return;
        }

        res.redirect("/attendanceList");

    });

};


// Attendance List
exports.attendanceList = (req, res) => {

    attendanceModel.getAttendance((err, attendance) => {

        if(err){
            console.log(err);
            return;
        }

        res.render("attendance/attendanceList", {
            attendance
        });

    });

};