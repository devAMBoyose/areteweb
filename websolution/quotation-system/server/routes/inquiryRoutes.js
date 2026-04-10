const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});

function generateTicketNumber() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `DEV-${y}${m}${d}-${rand}`;
}

router.post("/", upload.single("fileUpload"), async (req, res) => {
    try {
        const {
            fullName,
            companyName,
            email,
            phone,
            contactMethod,
            projectType,
            industry,
            launchDate,
            budget,
            existingWebsite,
            referenceLink,
            projectGoal,
            features,
            modules,
            workflow,
            notes,
        } = req.body;

        let parsedModules = [];
        try {
            parsedModules = modules ? JSON.parse(modules) : [];
        } catch {
            parsedModules = [];
        }

        const ticketNumber = generateTicketNumber();

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const emailText = `
New Inquiry Received – DevArete

Client Information
------------------
Full Name: ${fullName || ""}
Company / Business Name: ${companyName || ""}
Email Address: ${email || ""}
Phone / WhatsApp: ${phone || ""}
Preferred Contact Method: ${contactMethod || ""}

Project Information
-------------------
Project Type: ${projectType || ""}
Industry / Business Type: ${industry || ""}
Target Launch Date: ${launchDate || ""}
Estimated Budget: ${budget || ""}

Links
-----
Existing Website Link: ${existingWebsite || ""}
Reference Website / Inspiration Link: ${referenceLink || ""}

Project Details
---------------
Main Goal of the Project:
${projectGoal || ""}

Features Needed:
${features || ""}

Selected Modules / Functions:
${parsedModules.length ? parsedModules.join(", ") : "None"}

Current Workflow / Problem to Solve:
${workflow || ""}

Additional Notes:
${notes || ""}

Attachment:
${req.file ? req.file.originalname : "No attachment uploaded"}

Ticket Number:
${ticketNumber}

---
This inquiry was submitted from the DevArete contact form.
        `.trim();

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO || process.env.MAIL_USER,
            replyTo: email || process.env.MAIL_USER,
            subject: `New Inquiry Received – ${fullName || "Website Client"}`,
            text: emailText,
            attachments: req.file
                ? [
                    {
                        filename: req.file.originalname,
                        path: req.file.path,
                        contentType: req.file.mimetype,
                    },
                ]
                : [],
        });

        return res.status(200).json({
            success: true,
            message: "Inquiry sent successfully.",
            ticketNumber,
        });
    } catch (error) {
        console.error("Inquiry route error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send inquiry.",
            error: error.message,
        });
    }
});

module.exports = router;