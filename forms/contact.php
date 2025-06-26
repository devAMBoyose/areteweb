<?php
// ✅ Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ✅ (Optional) Test direct mail first
/*
$to = "admin@hiravuelo.com";
$subject = "Test Message";
$message = "This is a test email from Render server";
$headers = "From: test@areteweb.onrender.com";

if(mail($to, $subject, $message, $headers)) {
    echo "OK";
} else {
    echo "Mail failed";
    exit;
}
*/

// ✅ Set the recipient email
$receiving_email_address = 'admin@hiravuelo.com';

// ✅ Include the PHP Email Form library
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

// ✅ Initialize the form handler
$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'] ?? '';
$contact->from_email = $_POST['email'] ?? '';
$contact->subject = $_POST['subject'] ?? 'Contact Form Submission';

// ✅ SMTP configuration for Namecheap Private Email
$contact->smtp = array(
  'host' => 'mail.privateemail.com',
  'username' => 'admin@hiravuelo.com',
  'password' => '*3fBjCN2', // ✅ Replace with app password if 2FA is on
  'port' => '587'
);

// ✅ Add form message fields
$contact->add_message($_POST['name'] ?? '', 'From');
$contact->add_message($_POST['email'] ?? '', 'Email');
if (!empty($_POST['phone'])) {
  $contact->add_message($_POST['phone'], 'Phone');
}
$contact->add_message($_POST['message'] ?? '', 'Message', 10);

// ✅ Send the email
echo $contact->send();
?>
