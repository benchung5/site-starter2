<?php

use Lib\Model;

class Users_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function get_user($opts = []) 
	{
		$this->db->table('users')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
		}

		if (isset($opts['email'])) {
			$this->db->where('email', '=', $opts['email']);
		}

		$result = $this->db->get();

		if ($result && isset($opts['password'])) {
			if (! password_verify($opts['password'], $result->password)) {
				$result = false;
			}
		}
		
		return $result;
	}

	public function add_user($data)
	{
		if (is_array($data) && isset($data['email'])) {

			// as of php7 salt is depreciated (just use default generated one)
			$data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);

			$this->db->table('users')->insert($data);

			return $data['email'];
		}
	}

	public function remove($opts = []) 
	{
		$this->db->table('users');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
		}

		if (isset($opts['email'])) {
			$this->db->where('email', '=', $opts['email']);
		}

		if ($opts) {
			$this->db->delete();
		}
	}

	public function get_all($opts = []) {
		$this->db->table('users');

		if ($opts) {
			$this->db->select(implode(',', $opts));
		} else {
			$this->db->select('*');
		}

		$result = $this->db->orderBy('email')->getAll();
		return $result;
	}
}