const express = require("express");
const app = express();

app.use(express.json());

const recruiterRoutes = require("./routes/recruiterRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recruiter", recruiterRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "QueueLess API Running 🚀"
    });
});

module.exports = app;