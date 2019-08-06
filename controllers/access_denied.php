<?php
namespace Controllers;
use Lib\Controller;

class Access_denied extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		$this->render('access_denied', null, 'Access Denied');
	}
}