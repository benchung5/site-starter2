<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Tree_tables extends Controller 
{
	protected $origins = null;

	public function __construct() 
	{
		$this->origins = $this->load_model('origins_model');
		$this->eco_benefits = $this->load_model('eco_benefits_model');
		$this->native_to = $this->load_model('native_to_model');
		$this->zones = $this->load_model('zones_model');
		$this->tree_categories = $this->load_model('trees_category_model');
		$this->genuses = $this->load_model('genuses_model');
		$this->tags = $this->load_model('tags_files_trees_model');
		$this->shapes = $this->load_model('shapes_model');
		$this->light = $this->load_model('light_model');
		$this->soil = $this->load_model('soil_model');
		$this->natural_habitat = $this->load_model('natural_habitat_model');
		$this->common_uses = $this->load_model('common_uses_model');
		$this->transplanting = $this->load_model('transplanting_model');
		$this->unique_attractions = $this->load_model('unique_attractions_model');
		$this->tolerances = $this->load_model('tolerances_model');
		$this->reproduction_types = $this->load_model('reproduction_types_model');
		$this->insects = $this->load_model('insects_model');
		$this->diseases = $this->load_model('diseases_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$tree_tables = [];

		$tree_tables = [
			'origins' => $this->origins->get_all() ?: [],
			'eco_benefits' => $this->eco_benefits->get_all() ?: [],
			'native_to' => $this->native_to->get_all() ?: [],
			'zones' => $this->zones->get_all() ?: [],
			'trees_category' =>  $this->tree_categories->get_all() ?: [],
			'genuses' => $this->genuses->get_all() ?: [],
			'tags' => $this->tags->get_all() ?: [],
			'shapes' => $this->shapes->get_all() ?: [],
			'light' => $this->light->get_all() ?: [],
			'soil' => $this->soil->get_all() ?: [],
			'natural_habitat' => $this->natural_habitat->get_all() ?: [],
			'common_uses' => $this->common_uses->get_all() ?: [],
			'transplanting' => $this->transplanting->get_all() ?: [],
			'unique_attractions' => $this->unique_attractions->get_all() ?: [],
			'tolerances' => $this->tolerances->get_all() ?: [],
			'reproduction_types' => $this->reproduction_types->get_all() ?: [],
			'insects' => $this->insects->get_all() ?: [],
			'diseases' => $this->diseases->get_all() ?: [],
		];

		Utils::json_respond(SUCCESS_RESPONSE, $tree_tables);
	}
}