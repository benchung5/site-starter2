<?php
namespace Lib;
use Config\Config;

class Uri 
{
	public function __construct() {
	}

	private static function _get_current_uri()
	{
	    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
	    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
	    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
	    $uri = trim($uri, '/');
	    return $uri;
	}

	private static function get_segments()
	{
		$base_url = self::_get_current_uri();

		$segments = array();
		$url_array = explode('/', $base_url);

		foreach($url_array as $segment)
		{
		    if(trim($segment) != '')
		        array_push($segments, $segment);
		}

		return $segments;
	}

	public static function get_parts() 
	{
		$segments = self::get_segments();
		$parts = [];

		$index = 0;

		// controller
		if (isset($segments[0]) && is_dir(Config::paths('CONTROLLER_PATH').$segments[0])) {
			$parts['controller_dir'] = $segments[0];
			$index = 1;
		}
		$parts['controller'] = isset($segments[$index]) ? $segments[$index] : 'index';
		$index++;

		//action
		$parts['action'] = isset($segments[$index]) ? $segments[$index] : 'index';

		// action parameters
		$segments = array_slice($segments, $index+1);

		$parts['params'] = (!empty($segments)) ? array_values($segments) : [];

		return $parts;
	}
}