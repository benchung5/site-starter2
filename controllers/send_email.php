<?php
namespace Controllers;
use Lib\Controller;

class Send_email extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) 
	{
		if(isset($_POST['email'])) {

		    // CHANGE THE TWO LINES BELOW
			$email_to = "ben@benchung.com";
			$email_subject = "Form submission from natruewithus.com";

		    // validation expected data exists
			if(!isset($_POST['name']) ||
				!isset($_POST['email']) ||
				!isset($_POST['message'])) {
				$this->died('Please fill in all required fields.');       
			}

		    $name = $_POST['name']; // required
		    $email_from = $_POST['email']; // required
		    $message = $_POST['message']; // required

		    $error_message = "";
		    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
		    if(!preg_match($email_exp,$email_from)) {
		    	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
		    }
		    $string_exp = "/^[A-Za-z .'-]+$/";
		    if(!preg_match($string_exp,$name)) {
		    	$error_message .= 'The First Name you entered does not appear to be valid.<br />';
		    }
		    if(strlen($message) < 2) {
		    	$error_message .= 'The message you entered does not appear to be valid.<br />';
		    }
		    if(strlen($error_message) > 0) {
		    	$this->died($error_message);
		    }
		    $email_message = "Form details below.\n\n";

		    function clean_string($string) {
		    	$bad = array("content-type","bcc:","to:","cc:","href");
		    	return str_replace($bad,"",$string);
		    }

		    $email_message .= "First Name: ".clean_string($name)."\n";
		    $email_message .= "Email: ".clean_string($email_from)."\n";
		    $email_message .= "message: ".clean_string($message)."\n";


			// create email headers
		    $headers = 'From: '.$email_from."\r\n".
		    'Reply-To: '.$email_from."\r\n" .
		    'X-Mailer: PHP/' . phpversion();
		    @mail($email_to, $email_subject, $email_message, $headers);
		    //echo mail($email_to, $email_subject, $email_message, $headers);

		    $this->render('email_sent');
		}
	}

	protected function died($error) 
	{
        // your error code can go here
		echo "Apologies, but there were error(s) found with the form you submitted. ";
		echo $error."<br /><br />";
		die();
	}

}