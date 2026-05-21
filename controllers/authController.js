const db = require("../config/db");
const bcrypt = require("bcryptjs");


// Login Page
exports.loginPage = (req, res) => {
    res.render("auth/login");
};


// Login Logic
exports.login = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if(err){
            console.log(err);
            return;
        }

        if(result.length === 0){
            return res.send("Invalid Email");
        }

        const admin = result[0];

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if(!isMatch){
            return res.send("Invalid Password");
        }

        // Session Create
        req.session.admin = admin;

        res.redirect("/dashboard");

    });

};


// Dashboard
exports.dashboard = (req, res) => {

    if(!req.session.admin){
        return res.redirect("/login");
    }

    // Total Employees
    const totalEmployeesQuery =
        "SELECT COUNT(*) AS totalEmployees FROM employees";

    // Present Today
    const presentQuery = `
        SELECT COUNT(*) AS presentToday
        FROM attendance
        WHERE date = CURDATE()
        AND status = 'Present'
    `;

    // Absent Today
    const absentQuery = `
        SELECT COUNT(*) AS absentToday
        FROM attendance
        WHERE date = CURDATE()
        AND status = 'Absent'
    `;

    // Leave Count
    const leaveQuery = `
        SELECT COUNT(*) AS leaveCount
        FROM attendance
        WHERE date = CURDATE()
        AND status = 'Leave'
    `;


    db.query(totalEmployeesQuery, (err, totalResult) => {

        if(err){
            console.log(err);
            return;
        }

        db.query(presentQuery, (err, presentResult) => {

            if(err){
                console.log(err);
                return;
            }

            db.query(absentQuery, (err, absentResult) => {

                if(err){
                    console.log(err);
                    return;
                }

                db.query(leaveQuery, (err, leaveResult) => {

                    if(err){
                        console.log(err);
                        return;
                    }

                    res.render("dashboard/dashboard", {

                        admin: req.session.admin,

                        totalEmployees:
                            totalResult[0].totalEmployees,

                        presentToday:
                            presentResult[0].presentToday,

                        absentToday:
                            absentResult[0].absentToday,

                        leaveCount:
                            leaveResult[0].leaveCount

                    });

                });

            });

        });

    });

};

// Logout
exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });

};