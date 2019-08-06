<?php
namespace Lib;
use Config\Config;

class View 
{
	protected $view_data = [];

	public function __construct() 
	{
	}

	public function render($view_file, $view_data )
	{
		$view_path = './views/'.$view_file.'.php';
		if (file_exists($view_path)) {
			$main_content = $view_path;
			//include_once Config::paths('VIEW_PATH'). 'layout.php';
			include_once './layout.php';
		}
	}

	public function insert($view_file)
	{
		$view_path = './views/'.$view_file.'.php';
		if (file_exists($view_path)) {
			$main_content = $view_path;
			include_once $main_content;
		}
	}
}