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

	public function view($category, $title)
	{
		$plant = $this->trees->get(['category' => $category, 'slug' => $title]);
		
		if ($plant) {
			$view_data = [];
			$view_data['tree'] = $plant;
			$this->render('view_plant', $view_data, $plant->common_name);
		} else {
			$this->render('404');
		}
	}
}