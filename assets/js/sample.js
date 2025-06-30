emailjs.sendForm("service_g4vsyal", "template_o7utfto", form)
  .then(function(response) {
    alert("Appointment sent successfully!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("scheduleModal"));
    modal.hide();
    form.reset();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }, function(error) {
    console.error("EmailJS Error:", error); // <--- copy what's shown here
    alert("Failed to send appointment. Please try again.");
  });