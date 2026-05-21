const db = require("../config/db");


// Get All Employees
exports.getAllEmployees = (callback) => {

    const sql = "SELECT * FROM employees";

    db.query(sql, callback);

};


// Add Employee
exports.addEmployee = (data, callback) => {

    const sql = `
        INSERT INTO employees
        (name, email, department, salary)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, data, callback);

};

// Get Employee By ID
exports.getEmployeeById = (id, callback) => {

    const sql = `
        SELECT * FROM employees
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};


// Update Employee
exports.updateEmployee = (data, id, callback) => {

    const sql = `
        UPDATE employees
        SET name = ?, email = ?, department = ?, salary = ?
        WHERE id = ?
    `;

    db.query(sql, [...data, id], callback);

};


// Delete Employee
exports.deleteEmployee = (id, callback) => {

    const sql = `
        DELETE FROM employees
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};