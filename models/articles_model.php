<?php

use Lib\Model;
use Lib\Utils;

class Articles_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = [])
	{
		$this->db->table('articles a')->select('a.id, a.slug, a.name, a.body, a.created_on');

		if (isset($opts['id'])) {
			$this->db->where('a.id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('a.slug', '=', $opts['slug']);
		}

		if (isset($opts['category'])) {
			$this->db->innerJoin('article_categories ac', 'a.id', 'ac.article_id');
			$this->db->innerJoin('categories c', 'c.id', 'ac.category_id');
			$this->db->where('c.slug', '=' , $opts['category']);
		}

		$result = $this->db->get();

		if ($result) {
			// get images
			$result->images = $this->db->table('files')
				->select('id, name, description')
				->where('ref_id', $result->id)
				// ->orderBy('sort_order, name')
				->getAll();

			// get categories
			$result->categories = $this->db->table('article_categories ac')
				->select('c.id, c.slug, c.name')
				->where('article_id', $result->id)
				->innerJoin('categories c', 'c.id', 'ac.category_id')
				->getAll();

			// get tags
			$result->tags = $this->db->table('article_tags at')
				->select('t.id, t.name')
				->where('article_id', $result->id)
				->innerJoin('tags t', 't.id', 'at.tag_id')
				->getAll();
			
			return $result;
		}

		return false;
	}

	public function count()
	{
		$result = $this->db->table('articles')->count('id', 'total_rows')->get();
		if ($result) {
			return (int)$result->total_rows;
		} 
		return false;
	}

	public function add($data, $joins_data)
	{
		if (is_array($data)) {
			$this->db->table('articles')->insert($data);
			$new_article_id = $this->db->insertId();

			//insert joins
			$this->insert_joins($new_article_id, $joins_data, 'categories', 'category_id', 'article_categories');
			$this->insert_joins($new_article_id, $joins_data, 'tags', 'tag_id', 'article_tags');
			
			return $new_article_id;
		}

		return false;
	}

	protected function insert_joins($article_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			$ids = (! is_array($joins[$table_name])) ? explode(',', $joins[$table_name]) : $joins[$table_name];

			foreach ($ids as $id) {
				$ins = ['article_id' => $article_id, $table_id_name => $id];
				$this->db->table($join_table_name)->insert($ins);
			}
		}
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('articles');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			if (isset($opts['slug'])) {
				$this->db->where('slug', '=', $opts['slug']);
			}

			$article = $this->db->get();

			$deleted_article_id = $article->id;

			$this->db->table('articles')->where('id', $deleted_article_id)->delete();

			// remove categories
			$this->db->table('article_categories')->where('article_id', $deleted_article_id)->delete();

			// remove tags
			$this->db->table('article_tags')->where('article_id', $deleted_article_id)->delete();

			// remove files
			$this->db->table('files')->where('ref_id', $deleted_article_id)->delete();

			return $deleted_article_id;
		}

		return false;
	}

	public function get_all($opts = [], $isCount = false) 
	{
		$this->db->table('articles a');

		// use search criteria
		if (isset($opts['like'])) {
			$this->db->grouped(function($q, $opts) {
				$q->like('a.name', '%'.$opts['like'].'%')->orLike('a.slug', '%'.$opts['like'].'%');
			}, $opts);
		}


		if ($isCount) {
			 $this->db->select('DISTINCT a.id');

			 $result = $this->db->getAll();

			return count($result);
		} else {
			if (isset($opts['select'])) {
				$this->db->select(implode(',', $opts['select']));
			} else {
				$this->db->select('a.id, a.slug, a.name');
			}

			if (isset($opts['offset'])) {
				$this->db->limit($opts['offset'], $opts['limit']);
			}

			if (isset($opts['categories'])) {
				if (count($opts['categories']) > 0) {
					$this->db
						->innerJoin('article_categories at', 'at.article_id', 'a.id')
						->innerJoin('categories t', 't.id', 'at.category_id')
						->in('t.id', $opts['categories']);
				} else {
					// force no results since category is queried but no category is selected
					return [];
				}
			}

			//include images and categories
			$this->db
				->select('GROUP_CONCAT(f.name ORDER BY f.sort_order, f.name) AS images')
				->select('GROUP_CONCAT(f.description ORDER BY f.sort_order, f.name) AS image_descriptions')
				->select('GROUP_CONCAT(DISTINCT c.slug) AS categories')
				->leftJoin('files f', 'f.ref_id', 'a.id')
				->leftJoin('article_categories ac', 'ac.article_id', 'a.id')
				->leftJoin('categories c', 'c.id', 'ac.category_id')
				->groupBy('a.id');

			$result = $this->db->getAll();

			return $result;
		}
	}

	public function update($opts = []) 
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('articles');
			$this->db->where($opts['where'])->update($opts['update']);
		}

		$article_id = $this->db->table('articles')->where($opts['where'])->get()->id;

		if (isset($opts['categories'])) {
			// clear existing associations
			$this->db->table('article_categories')->where('article_id', $article_id)->delete();

			// insert new associations
			$categories = is_array($opts['categories']) ? $opts['categories'] : explode(',', $opts['categories']);
			foreach ($categories as $category_id) {
				$this->db->table('article_categories')->insert(['article_id' => $article_id, 'category_id' => $category_id]);
			}
		}
		if (isset($opts['tags'])) {
			// clear existing associations
			$this->db->table('article_tags')->where('article_id', $article_id)->delete();

			// insert new associations
			$tags = is_array($opts['tags']) ? $opts['tags'] : explode(',', $opts['tags']);
			foreach ($tags as $tag_id) {
				$this->db->table('article_tags')->insert(['article_id' => $article_id, 'tag_id' => $tag_id]);
			}
		}
	}
}