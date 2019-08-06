<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Auth\Auth;
use Lib\Utils;
use Config\Config;


class Users extends Controller 
{
	protected $users = null;

	public function __construct() 
	{
		$this->users = $this->load_model('users_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function verify() 
	{
		$data = Utils::json_read();

		try {
			$payload = Auth::validateToken();
			if (isset($payload->userId)) {
				$user = $this->users->get_user(['id' => $payload->userId]);
				Utils::json_respond(SUCCESS_RESPONSE, ['id' => $user->id]);
				Utils::dbug($user);
			} else {
				Utils::json_respond(INVALID_USER_PASS, "user not found.");
			}
			
		} catch (Exception $e) {
			Utils::json_respond_error(ACCESS_TOKEN_ERRORS, $e->getMessage());
		}
	}

	public function sign_in()
	{
		$data = Utils::json_read();

		if ($data['key'] == Config::paths('SIGNIN_KEY')) {
			$this->validator->addEntries(['email' => $data['email']]);
			$this->validator->addEntries(['password' => $data['password']]);
			$this->validator->addRule('email', 'Must be a valid email address', 'email');
			$this->validator->addRule('password', 'Must be a valid password', 'password');
			$this->validator->validate();

			if ($this->validator->foundErrors()) {
			    $errors = $this->validator->getErrors();
			    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
			}

			try {
				$user = $this->users->get_user(['email' => $data['email'], 'password' => $data['password']]);
				
				if (! $user) {
					Utils::json_respond(INVALID_USER_PASS, "Email or Password is incorrect.");
				} else if ($user->active == 0) {
					Utils::json_respond(USER_NOT_ACTIVE, "User is not activated. Please contact to admin.");
				}

				$data = Auth::generateToken($user->id);

				Utils::json_respond(SUCCESS_RESPONSE, $data);
			} catch (Exception $e) {
				//Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
				Utils::json_respond_error(JWT_PROCESSING_ERROR, 'Bad login info');
			}

			Auth::generateToken();
		} else {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, 'Bad login info');
		}
	}

	public function create()
	{
		$data = Utils::json_read();

		$this->validator->addEntries(['email' => $data['email']]);
		$this->validator->addEntries(['password' => $data['password']]);
		$this->validator->addRule('email', 'Must be a valid email address', 'email');
		$this->validator->addRule('password', 'Must be a valid password', 'password');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$this->users->add_user(['email' => $data['email'], 'password' => $data['password'], 'active' => 1, 'created_on' => date('Y-m-d')]);

			$id = $this->users->db->insertId();
			$new_user = $this->users->get_user(['id' => $id]);

			Utils::json_respond(SUCCESS_RESPONSE, $new_user->email);
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}

		Auth::generateToken();
	}

	public function delete()
	{
		$data = Utils::json_read();

		$this->users->remove(['email' => $data['email']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['email']);
	}

	public function all() 
	{
		$users = $this->users->get_all(['id', 'email']);
		if ($users) {
			Utils::json_respond(SUCCESS_RESPONSE, $users);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}
}