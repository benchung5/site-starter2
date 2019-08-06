<?php
namespace Controllers;
use Lib\Controller;

class Login extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$this->render('login', null, 'Login');
	}
}