document.getElementById('supportForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const supportType = document.getElementById('supportType').value;
  const message = document.getElementById('supportMessage').value;

  // Generate unique ticket number (example: TKT-20250712-8347)
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const ticketNumber = `TKT-${datePart}-${randomPart}`;

  emailjs.send("service_devarete", "template_u8djrrp", {
    support_type: supportType,
    message: message,
    ticket_number: ticketNumber
  })
  .then(() => {
    document.getElementById('ticketSuccess').classList.remove('d-none');
    this.reset();
  }, (error) => {
    alert("Failed to send ticket. Try again later.");
    console.error("EmailJS Error:", error);
  });
});
