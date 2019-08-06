<?php
namespace Controllers;
use Lib\Controller;
use Lib\Validation\Validator;

class Index extends Controller 
{
	public function __construct() 
	{
		//$this->load_script('controllers/login.js');
	}

	public function index($param = null) {

		// pass view data to view
		$this->render('index', null, 'Niagara Tree Care & Removal');
	}
}