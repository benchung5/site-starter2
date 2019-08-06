<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Tags extends Controller 
{
	protected $tags = null;

	public function __construct() 
	{
		$this->tags = $this->load_model('tags_model');

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
			$this->tags->add(['slug' => $data['slug'], 'name' => $data['name'], 'created_on' => date('Y-m-d')]);

			$id = $this->tags->db->insertId();

			$new_tag = $this->tags->get(['id' => $id]);

			Utils::json_respond(SUCCESS_RESPONSE, $new_tag);
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}
	}

	public function delete()
	{
		$data = Utils::json_read();

		$this->tags->remove(['slug' => $data['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['name']);
	}

	public function all() 
	{
		$tags = $this->tags->get_all(['id', 'slug', 'name']);
		if ($tags) {
			Utils::json_respond(SUCCESS_RESPONSE, $tags);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$tags = $this->tags->get(['slug' => $slug]);
		if ($tags) {
			Utils::json_respond(SUCCESS_RESPONSE, $tags);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function update() 
	{
		$data = Utils::json_read();

		try {
			$this->tags->update(['where' => ['slug' => $data['slug']], 'update' => ['name' => $data['name']]]);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}
}