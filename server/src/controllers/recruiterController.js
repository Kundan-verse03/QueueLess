const Recruiter = require("../models/Recruiter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Recruiter
const registerRecruiter = async (req, res) => {
  try {
    const { companyName, email, password, location } = req.body;

    if (!companyName || !email || !password || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const recruiterExists = await Recruiter.findOne({ email });

    if (recruiterExists) {
      return res.status(400).json({
        success: false,
        message: "Recruiter already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const recruiter = await Recruiter.create({
      companyName,
      email,
      password: hashedPassword,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Recruiter registered successfully",
      recruiter,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Recruiter
const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: recruiter._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Recruiter login successful",
      token,
      recruiter: {
        id: recruiter._id,
        companyName: recruiter.companyName,
        email: recruiter.email,
        location: recruiter.location,
        role: recruiter.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerRecruiter,
  loginRecruiter,
};