<?php
// ✅ Enable PHP error reporting at the very beginning
ini_set('display_errors', 1);
error_reporting(E_ALL);

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
  'password' => '*3fBjCN2', // Make sure this is correct or use an App Password if 2FA is enabled
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
