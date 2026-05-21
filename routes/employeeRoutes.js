const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");


// Employee List
router.get("/employees", employeeController.employeeList);


// Add Employee Page
router.get("/addEmployee", employeeController.addEmployeePage);


// Add Employee
router.post("/addEmployee", employeeController.addEmployee);

// Edit Employee Page
router.get(
    "/editEmployee/:id",
    employeeController.editEmployeePage
);


// Update Employee
router.post(
    "/updateEmployee/:id",
    employeeController.updateEmployee
);


// Delete Employee
router.get(
    "/deleteEmployee/:id",
    employeeController.deleteEmployee
);


module.exports = router;