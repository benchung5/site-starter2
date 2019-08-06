<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Plants extends Controller 
{
	public function __construct() 
	{
		$this->trees = $this->load_model('trees_model');

		parent::__construct();
	}

	public function index() 
	{
		$this->render('plants', null, 'Niagara Tree Search', 'Search trees, shrubs and woody plants commonly found in the Niagara region');
	}

	public function view($slug = null)
	{
		$view_data = [];

		if ($slug) {
			$plant = $this->trees->get(['slug' => $slug]);
			$view_data['tree'] = $plant;
		}

		$this->render('view_plant', $view_data, $view_data['tree']->common_name);
	}
}