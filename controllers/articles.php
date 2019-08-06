<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Articles extends Controller 
{
	public function __construct() 
	{
		$this->articles = $this->load_model('articles_model');

		parent::__construct();
	}

	public function index() 
	{
		$this->render('articles', null, 'Articles', 'Search articles on Niagara trees. Topics include trees in Niagara, native trees, sustainable tree care, designing with trees and tree biology.');
	}

	public function view($slug = null)
	{
		$view_data = [];

		if ($slug) {
			$article = $this->articles->get(['slug' => $slug]);
			$view_data['article'] = $article;
		}

		$this->render('view', $view_data, $view_data['article']->name);
	}
}