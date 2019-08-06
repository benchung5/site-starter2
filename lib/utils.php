<?php
namespace Lib;
use Config\Config;

class Utils
{
	public function __construct() {
		parent::__construct();
	}

	public static function read_get() {
		if($_SERVER['REQUEST_METHOD'] !== 'GET') {
			self::json_respond_error(REQUEST_METHOD_NOT_VALID, 'Request Method is not valid.');
		}

		return $_GET;
	}

	public static function read_post() {
		if($_SERVER['REQUEST_METHOD'] !== 'POST') {
			self::json_respond_error(REQUEST_METHOD_NOT_VALID, 'Request Method is not valid.');
		}

		return $_POST;
	}

	public static function json_read()
	{
		if($_SERVER['REQUEST_METHOD'] !== 'POST') {
			self::json_respond_error(REQUEST_METHOD_NOT_VALID, 'Request Method is not valid.');
		}

		if(($_SERVER['CONTENT_TYPE'] !== 'application/json') && ($_SERVER['CONTENT_TYPE'] !== 'application/json;charset=UTF-8')) {
			self::json_respond_error(REQUEST_CONTENTTYPE_NOT_VALID, 'Request content type is not valid');
		}

		$handler = fopen('php://input', 'r');
		$request = stream_get_contents($handler);
		$data = json_decode($request, true);

		return $data;
	}

	public static function json_respond($code, $data)
	{
		header("content-type: application/json");
		header('Status: '.$code);
		$response = json_encode($data);
		echo $response; exit;
	}

	public static function json_respond_error($code, $message) 
	{
		header("content-type: application/json");
		header('Status: '.$code);
		$errorMsg = json_encode(['error' => $message]);
		echo $errorMsg; exit;
	}

	public static function sanitize($str) 
	{
		$str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');

		return $str;
	}

	public static function dbug($data) 
	{
		//Something to write to txt log
		$log  = print_r($data, true).PHP_EOL.
		        '-----------------------------------------------'.PHP_EOL;
		//Save string to log, use FILE_APPEND to append.
		file_put_contents('./log/debug_log.log', $log, FILE_APPEND);	
		//chmod('./log/debug_log.log', 0777);
	}
}