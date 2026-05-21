const employeeModel = require("../models/employeeModel");


// Employee List
exports.employeeList = (req, res) => {

    employeeModel.getAllEmployees((err, employees) => {

        if(err){
            console.log(err);
            return;
        }

        res.render("employees/employees", {
            employees
        });

    });

};


// Add Employee Page
exports.addEmployeePage = (req, res) => {

    res.render("employees/addEmployee");

};


// Add Employee
exports.addEmployee = (req, res) => {

    const { name, email, department, salary } = req.body;

    const data = [
        name,
        email,
        department,
        salary
    ];

    employeeModel.addEmployee(data, (err) => {

        if(err){
            console.log(err);
            return;
        }

        res.redirect("/employees");

    });

};

// Edit Employee Page
exports.editEmployeePage = (req, res) => {

    const id = req.params.id;

    employeeModel.getEmployeeById(id, (err, result) => {

        if(err){
            console.log(err);
            return;
        }

        res.render("employees/editEmployee", {
            employee: result[0]
        });

    });

};


// Update Employee
exports.updateEmployee = (req, res) => {

    const id = req.params.id;

    const { name, email, department, salary } = req.body;

    const data = [
        name,
        email,
        department,
        salary
    ];

    employeeModel.updateEmployee(data, id, (err) => {

        if(err){
            console.log(err);
            return;
        }

        res.redirect("/employees");

    });

};


// Delete Employee
exports.deleteEmployee = (req, res) => {

    const id = req.params.id;

    employeeModel.deleteEmployee(id, (err) => {

        if(err){
            console.log(err);
            return;
        }

        res.redirect("/employees");

    });

};