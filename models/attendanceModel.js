const db = require("../config/db");


// Get Employees
exports.getEmployees = (callback) => {

    const sql = `
        SELECT * FROM employees
    `;

    db.query(sql, callback);

};


// Add Attendance
exports.addAttendance = (data, callback) => {

    const sql = `
        INSERT INTO attendance
        (employee_id, date, status)
        VALUES (?, ?, ?)
    `;

    db.query(sql, data, callback);

};


// Get Attendance
exports.getAttendance = (callback) => {

    const sql = `
        SELECT attendance.*, employees.name
        FROM attendance
        JOIN employees
        ON attendance.employee_id = employees.id
        ORDER BY attendance.date DESC
    `;

    db.query(sql, callback);

};