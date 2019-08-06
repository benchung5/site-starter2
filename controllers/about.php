<?php
namespace Controllers;
use Lib\Controller;

class About extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$this->render('about', null, 'About');
	}
}