<?php
namespace Lib;
use Config\Config;
use Lib\Db;

class Model {
	public $db = null;

	public function __construct() {
		 $Db = new Db();
		 $this->db = $Db->connect();
	}

	public function load_model($model_file)
	{
		$path = Config::paths('MODEL_PATH').$model_file.'.php';
		if (file_exists($path)) {
			include_once($path);
			return new $model_file();
		}
	}
}