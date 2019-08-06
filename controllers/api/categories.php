<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Categories extends Controller 
{
	protected $categories = null;

	public function __construct() 
	{
		$this->categories = $this->load_model('categories_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		$data = Utils::json_read();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$this->categories->add(['slug' => $data['slug'], 'name' => $data['name'], 'created_on' => date('Y-m-d')]);

			$id = $this->categories->db->insertId();

			$new_category = $this->categories->get(['id' => $id]);

			Utils::json_respond(SUCCESS_RESPONSE, $new_category);
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}
	}

	public function delete()
	{
		$data = Utils::json_read();

		$this->categories->remove(['slug' => $data['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['name']);
	}

	public function all() 
	{
		$categories = $this->categories->get_all(['id', 'slug', 'name']);
		if ($categories) {
			Utils::json_respond(SUCCESS_RESPONSE, $categories);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$categories = $this->categories->get(['slug' => $slug]);
		if ($categories) {
			Utils::json_respond(SUCCESS_RESPONSE, $categories);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function update() 
	{
		$data = Utils::json_read();

		try {
			$this->categories->update(['where' => ['slug' => $data['slug']], 'update' => ['name' => $data['name'], 'icon' => $data['icon']]]);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}
}