const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "QueueLess API Running 🚀"
    });
});

module.exports = app;