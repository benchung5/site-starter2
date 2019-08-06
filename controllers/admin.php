<?php
namespace Controllers;
use Lib\Controller;

class Admin extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) 
	{
		$this->render('admin', null, 'Admin');
	}
}