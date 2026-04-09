const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
    {
        clientName: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            trim: true,
        },
        projectTitle: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Draft", "Sent", "Approved", "Rejected"],
            default: "Draft",
        },
        validUntil: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);