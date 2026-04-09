// server/models/Inquiry.js
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        ticketNumber: { type: String, required: true, unique: true },
        fullName: { type: String, required: true, trim: true },
        companyName: { type: String, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, trim: true },
        contactMethod: { type: String, trim: true },
        projectType: { type: String, trim: true },
        industry: { type: String, trim: true },
        launchDate: { type: Date },
        budget: { type: String, trim: true },
        existingWebsite: { type: String, trim: true },
        referenceLink: { type: String, trim: true },
        projectGoal: { type: String, trim: true },
        features: { type: String, trim: true },
        modules: [{ type: String }],
        workflow: { type: String, trim: true },
        notes: { type: String, trim: true },
        attachmentPath: { type: String, trim: true },
        status: {
            type: String,
            enum: ["new", "reviewing", "contacted", "quoted", "closed"],
            default: "new",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);