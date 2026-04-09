import Inquiry from "../models/Inquiry.js";
import transporter from "../config/mailer.js";
import { generateTicketNumber } from "../utils/generateTicketNumber.js";
import {
    internalInquiryTemplate,
    autoReplyTemplate,
} from "../utils/emailTemplates.js";

export async function createInquiry(req, res) {
    try {
        const ticketNumber = generateTicketNumber();

        const modules = Array.isArray(req.body.modules)
            ? req.body.modules
            : req.body.modules
                ? [req.body.modules]
                : [];

        const inquiryData = {
            ticketNumber,
            fullName: req.body.fullName,
            companyName: req.body.companyName,
            email: req.body.email,
            phone: req.body.phone,
            contactMethod: req.body.contactMethod,
            projectType: req.body.projectType,
            industry: req.body.industry,
            launchDate: req.body.launchDate || null,
            budget: req.body.budget,
            existingWebsite: req.body.existingWebsite,
            referenceLink: req.body.referenceLink,
            projectGoal: req.body.projectGoal,
            features: req.body.features,
            modules,
            workflow: req.body.workflow,
            notes: req.body.notes,
            attachmentPath: req.file ? req.file.path : "",
        };

        const inquiry = await Inquiry.create(inquiryData);

        await transporter.sendMail({
            from: `DevArete <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO,
            replyTo: inquiry.email,
            subject: `[New Inquiry] ${ticketNumber} - ${inquiry.fullName}`,
            html: internalInquiryTemplate(inquiryData),
            attachments: req.file
                ? [
                    {
                        filename: req.file.originalname,
                        path: req.file.path,
                    },
                ]
                : [],
        });

        await transporter.sendMail({
            from: `DevArete <${process.env.MAIL_USER}>`,
            to: inquiry.email,
            subject: `We received your inquiry - ${ticketNumber}`,
            html: autoReplyTemplate(inquiryData),
        });

        return res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully.",
            ticketNumber,
            inquiry,
        });
    } catch (error) {
        console.error("Create inquiry error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit inquiry.",
            error: error.message,
        });
    }
}