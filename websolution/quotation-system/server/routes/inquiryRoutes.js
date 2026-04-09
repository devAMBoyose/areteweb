const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log("Inquiry received:", req.body);

        return res.status(200).json({
            success: true,
            message: "Inquiry submitted successfully.",
        });
    } catch (error) {
        console.error("Inquiry route error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit inquiry.",
        });
    }
});

module.exports = router;