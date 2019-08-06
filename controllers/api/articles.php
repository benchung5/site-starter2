<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Upload;


class Articles extends Controller 
{
	protected $articles = null;

	public function __construct() 
	{
		$this->articles = $this->load_model('articles_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		//handle posted input
		$data = Utils::read_post();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			//update data
			$update_data = [
				'slug' => $data['slug'], 
				'name' => $data['name'],
				'created_on' => date('Y-m-d')
			];
			if(isset($data['body'])) { $update_data['body'] = $data['body']; };

			//joins data
			$joins_data = [
				'categories' => isset($data['categories']) ? $data['categories'] : null,
				'tags' => isset($data['tags']) ? $data['tags'] : null,
			];

			$new_article_id = $this->articles->add(
				$update_data,
				$joins_data
			);

			$new_article = $this->articles->get(['id' => $new_article_id]);

			//handle file uploads
			Upload::upload('articles', $new_article_id, $data);

			Utils::json_respond(SUCCESS_RESPONSE, $new_article);
		} catch (Exception $e) {
			Utils::json_respond_error('Could not create article', $e->getMessage());
		}
	}

	public function delete()
	{
		$data = Utils::json_read();

		// remove file uploads (need to do this before removing the files to get lookup)
		Upload::remove('articles', $data['article']['id']);

		$this->articles->remove(['slug' => $data['article']['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['article']);
	}

	public function all() 
	{
		$articles = $this->articles->get_all();
		if ($articles) {
			Utils::json_respond(SUCCESS_RESPONSE, $articles);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$article = $this->articles->get(['slug' => $slug]);
		if ($article) {
			Utils::json_respond(SUCCESS_RESPONSE, $article);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function update() 
	{
		$files = $this->load_model('files_model');

		$data = Utils::read_post();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$this->articles->update([
				'where' => ['slug' => $data['slug']], 
				'update' => [
					'name' => $data['name'],
					'body' => $data['body'],
				],
				'categories' => $data['categories'],
				'tags' => $data['tags']
			]);

			$new_article = $this->articles->get(['slug' => $data['slug']]);

			// new file uploads
			Upload::upload('articles', $new_article->id, $data);
			// update original file uploads
			if (isset($data['deleted_images'])) {
				$files->update_associations('articles', $new_article->id, $data['deleted_images']);	
			}

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	public function search()
	{
		$data = Utils::read_get();

		$opts = [
			'offset' => $data['offset'], 
			'limit' => $data['limit'], 
			'like' => isset($data['search']) ? $data['search'] : null, 
			'categories' => isset($data['categories']) ? $data['categories'] : null,
			'tags' => isset($data['tags']) ? $data['tags'] : null, 
			'select' => ['a.id', 'a.slug', 'a.name']
		];

		$articles = $this->articles->get_all($opts);

		//just to count the results without the offset and limit
		$count = $this->articles->get_all($opts, true);

		$result = ['articles' => $articles, 'count' => $count, 'offset' => (int)$data['offset'], 'limit' => (int)$data['limit']];

		if ($articles) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['articles' => [], 'count' => 0, 'offset' => 0, 'limit' => (int)$data['limit']]);
		}		
	}
}