const express = require("express");
const path = require("path");
require("./config/db");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "erpsecret",
    resave: false,
    saveUninitialized: false
}));

// Static Folder
app.use(express.static(path.join(__dirname, "public")));


// View Engine
app.set("view engine", "ejs");

app.use("/", authRoutes);
app.use("/", employeeRoutes);
app.use("/", attendanceRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("ERP Tracker Running...");
});


// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});