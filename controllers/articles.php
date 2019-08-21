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

	public function view($category, $title)
	{
		$article = $this->articles->get(['category' => $category, 'slug' => $title]);

		if ($article) {
			$view_data = [];
			$view_data['article'] = $article;
			$this->render('view', $view_data, $article->name);
		} else {
			$this->render('404');
		}
	}
}