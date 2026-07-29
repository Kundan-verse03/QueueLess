const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
console.log("protect =", protect);
console.log("typeof protect =", typeof protect);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;