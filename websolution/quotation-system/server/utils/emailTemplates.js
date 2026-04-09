// server/utils/emailTemplates.js
export function internalInquiryTemplate(data) {
    return `
    <h2>New Inquiry Received</h2>
    <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
    <p><strong>Full Name:</strong> ${data.fullName}</p>
    <p><strong>Company:</strong> ${data.companyName || "-"}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "-"}</p>
    <p><strong>Preferred Contact Method:</strong> ${data.contactMethod || "-"}</p>
    <p><strong>Project Type:</strong> ${data.projectType || "-"}</p>
    <p><strong>Industry:</strong> ${data.industry || "-"}</p>
    <p><strong>Launch Date:</strong> ${data.launchDate || "-"}</p>
    <p><strong>Budget:</strong> ${data.budget || "-"}</p>
    <p><strong>Existing Website:</strong> ${data.existingWebsite || "-"}</p>
    <p><strong>Reference Link:</strong> ${data.referenceLink || "-"}</p>
    <p><strong>Main Goal:</strong><br/>${data.projectGoal || "-"}</p>
    <p><strong>Features Needed:</strong><br/>${data.features || "-"}</p>
    <p><strong>Modules:</strong> ${(data.modules || []).join(", ") || "-"}</p>
    <p><strong>Workflow / Problem:</strong><br/>${data.workflow || "-"}</p>
    <p><strong>Additional Notes:</strong><br/>${data.notes || "-"}</p>
  `;
}

export function autoReplyTemplate(data) {
    return `
    <p>Hello ${data.fullName},</p>
    <p>Thank you for contacting <strong>DevArete</strong>. We have received your inquiry.</p>
    <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
    <p><strong>Project Type:</strong> ${data.projectType || "General Inquiry"}</p>
    <p>Our team will review your request and get back to you soon.</p>
    <p>Best regards,<br/>DevArete<br/>consult@devarete.com</p>
  `;
}