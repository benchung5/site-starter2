<?php
namespace Controllers;
use Lib\Controller;

class Four_o_four extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) 
	{
		$this->render('404');
	}
}