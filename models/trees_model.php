<?php

use Lib\Model;
use Lib\Utils;

class Trees_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = [])
	{
		$this->db->table('trees t')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('t.id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('t.slug', '=', $opts['slug']);
		}

		if (isset($opts['category'])) {
			// _category_slug and _category_id are not to be used in the result
			// they're only named so they don't overwrite the tree id and slug
			// since we want to select * for trees
			$this->db->innerJoin('trees_category tc', 'tc.id', 't.trees_category_id');
			$this->db->select('t.*, tc.slug AS _category_slug, tc.id AS _category_id');
			$this->db->where('tc.slug', '=' , $opts['category']);
		}

		$result = $this->db->get();

		if ($result) {

			// get images
			$this->files_trees = $this->load_model('files_trees_model');
			$result->images = $this->files_trees->get_all_by_ref_id($result->id);

			// origins
			$result->origins = $this->db->table('trees_origins _to')
				->select('o.id, o.name')
				->where('tree_id', $result->id)
				->innerJoin('origins o', 'o.id', '_to.origin_id')
				->getAll();

			// eco_benefits
			$result->eco_benefits = $this->db->table('trees_eco_benefits te')
				->select('e.id, e.name')
				->where('te.tree_id', $result->id)
				->innerJoin('eco_benefits e', 'e.id', 'te.eco_benefit_id')
				->getAll();

			// native_to
			$result->native_to = $this->db->table('trees_native_to tnt')
				->select('n.id, n.name')
				->where('tnt.tree_id', $result->id)
				->innerJoin('native_to n', 'n.id', 'tnt.native_to_id')
				->getAll();

			// zone
			$result->zone = $this->db->table('zones')
				->select('id, name')
				->where('id', $result->zone_id)
				->get();

			// family and genus (get 1)
			$result->family_genus = $this->db->table('genuses g')
				->select('g.id AS genus_id, g.name AS genus_name, f.id AS family_id, f.name AS family_name')
				->where('g.id', $result->genus_id)
				->innerJoin('families f', 'f.id', 'g.family_id')
				->get();

			// categories
			$result->trees_category = $this->db->table('trees_category')
				->select('id, slug, name')
				->where('id', $result->trees_category_id)
				->get();

			// shapes
			$result->shapes = $this->db->table('trees_shapes ts')
				->select('s.id, s.name')
				->where('ts.tree_id', $result->id)
				->innerJoin('shapes s', 's.id', 'ts.shape_id')
				->getAll();

			// light
			$result->light = $this->db->table('trees_light tl')
				->select('l.id, l.name')
				->where('tl.tree_id', $result->id)
				->innerJoin('light l', 'l.id', 'tl.light_id')
				->getAll();

			// soil
			$result->soil = $this->db->table('trees_soil ts')
				->select('s.id, s.name')
				->where('ts.tree_id', $result->id)
				->innerJoin('soil s', 's.id', 'ts.soil_id')
				->getAll();

			// natural habitat
			$result->natural_habitat = $this->db->table('trees_natural_habitat tnh')
				->select('nh.id, nh.name')
				->where('tnh.tree_id', $result->id)
				->innerJoin('natural_habitat nh', 'nh.id', 'tnh.natural_habitat_id')
				->getAll();

			// common uses
			$result->common_uses = $this->db->table('trees_common_uses tcu')
				->select('cu.id, cu.name')
				->where('tcu.tree_id', $result->id)
				->innerJoin('common_uses cu', 'cu.id', 'tcu.common_use_id')
				->getAll();

			// transplanting
			$result->transplanting = $this->db->table('trees_transplanting tt')
				->select('t.id, t.name')
				->where('tt.tree_id', $result->id)
				->innerJoin('transplanting t', 't.id', 'tt.transplanting_id')
				->getAll();

			// unique attractions
			$result->unique_attractions = $this->db->table('trees_unique_attractions tua')
				->select('ua.id, ua.name')
				->where('tua.tree_id', $result->id)
				->innerJoin('unique_attractions ua', 'ua.id', 'tua.unique_attraction_id')
				->getAll();

			// tolerances
			$result->tolerances = $this->db->table('trees_tolerances tt')
				->select('tl.id, tl.name')
				->where('tt.tree_id', $result->id)
				->innerJoin('tolerances tl', 'tl.id', 'tt.tolerance_id')
				->getAll();

			// reproduction types
			$result->reproduction_type = $this->db->table('reproduction_types')
				->select('id, name')
				->where('id', $result->reproduction_type_id)
				->get();

			// insects
			$result->insects = $this->db->table('trees_insects ti')
				->select('i.id, i.name')
				->where('ti.tree_id', $result->id)
				->innerJoin('insects i', 'i.id', 'ti.insects_id')
				->getAll();

			// diseases
			$result->diseases = $this->db->table('trees_diseases td')
				->select('d.id, d.name')
				->where('td.tree_id', $result->id)
				->innerJoin('diseases d', 'd.id', 'td.disease_id')
				->getAll();

			// // conifer_leaf_type
			// $conifer_leaf_type = $this->db->table('trees_conifer tc')
			// 	->select('tc.leaf_type_id')
			// 	->where('tc.tree_id', $result->id)
			// 	->get();
			// if ($conifer_leaf_type) {
			// 	$result->conifer_leaf_type_id = $conifer_leaf_type->leaf_type_id;
			// }

			// // conifer leaf structures
			// $result->conifer_leaf_structures = $this->db->table('trees_conifer_leaf_structures tcls')
			// 	->select('cls.id, cls.name')
			// 	->where('tcls.tree_id', $result->id)
			// 	->innerJoin('conifer_leaf_structures cls', 'cls.id', 'tcls.conifer_leaf_structure_id')
			// 	->getAll();

			// // conifer leaf cross section
			// $conifer_leaf_cross_section = $this->db->table('trees_conifer tc')
			// 	->select('tc.leaf_cross_section_id')
			// 	->where('tc.tree_id', $result->id)
			// 	->get();
			// if ($conifer_leaf_cross_section) {
			// 	$result->conifer_leaf_cross_section_id = $conifer_leaf_cross_section->leaf_cross_section_id;
			// }

			// // conifer cone features
			// $result->conifer_cone_features = $this->db->table('trees_conifer_cone_features tccf')
			// 	->select('ccf.id, ccf.name')
			// 	->where('tccf.tree_id', $result->id)
			// 	->innerJoin('conifer_cone_features ccf', 'ccf.id', 'tccf.conifer_cone_feature_id')
			// 	->getAll();

			return $result;
		}

		return false;
	}

	public function count()
	{
		$result = $this->db->table('trees')->count('id', 'total_rows')->get();
		if ($result) {
			return (int)$result->total_rows;
		} 
		return false;
	}

	public function add($opts)
	{
		if (is_array($opts['insert'])) {
			$this->db->table('trees')->insert($opts['insert']);
			$new_tree_id = $this->db->insertId();

			// many to many tables
			if (isset($opts['joins'])) {
				$joins = $opts['joins'];

				$this->insert_joins($new_tree_id, $joins, 'origins', 'origin_id', 'trees_origins');
				$this->insert_joins($new_tree_id, $joins, 'eco_benefits', 'eco_benefit_id', 'trees_eco_benefits');
				$this->insert_joins($new_tree_id, $joins, 'native_to', 'native_to_id', 'trees_native_to');
				$this->insert_joins($new_tree_id, $joins, 'shapes', 'shape_id', 'trees_shapes');
				$this->insert_joins($new_tree_id, $joins, 'light', 'light_id', 'trees_light');
				$this->insert_joins($new_tree_id, $joins, 'soil', 'soil_id', 'trees_soil');
				$this->insert_joins($new_tree_id, $joins, 'natural_habitat', 'natural_habitat_id', 'trees_natural_habitat');
				$this->insert_joins($new_tree_id, $joins, 'common_uses', 'common_use_id', 'trees_common_uses');
				$this->insert_joins($new_tree_id, $joins, 'transplanting', 'transplanting_id', 'trees_transplanting');
				$this->insert_joins($new_tree_id, $joins, 'unique_attractions', 'unique_attraction_id', 'trees_unique_attractions');
				$this->insert_joins($new_tree_id, $joins, 'tolerances', 'tolerance_id', 'trees_tolerances');
				$this->insert_joins($new_tree_id, $joins, 'insects', 'insects_id', 'trees_insects');
				$this->insert_joins($new_tree_id, $joins, 'diseases', 'disease_id', 'trees_diseases');
				// $this->insert_joins($new_tree_id, $joins, 'conifer_leaf_structures', 'conifer_leaf_structure_id', 'trees_conifer_leaf_structures');
				// $this->insert_joins($new_tree_id, $joins, 'conifer_cone_features', 'conifer_cone_feature_id', 'trees_conifer_cone_features');

			}

			// // conifer data
			// if (isset($opts['conifer_data'])) {
			// 	$opts['conifer_data']['tree_id'] = $new_tree_id;
			// 	$this->db->table('trees_conifer')->insert($opts['conifer_data']);
			// }

			return $new_tree_id;
		}

		return false;
	}

	protected function insert_joins($tree_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			$ids = (! is_array($joins[$table_name])) ? explode(',', $joins[$table_name]) : $joins[$table_name];

			foreach ($ids as $id) {
				$ins = ['tree_id' => $tree_id, $table_id_name => $id];
				$this->db->table($join_table_name)->insert($ins);
			}
		}
	}

	public function update($opts = [])
	{
		$tree_id = $this->db->table('trees')->where($opts['where'])->get()->id;

		// streight updates
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('trees');
			$this->db->where($opts['where'])->update($opts['update']);
		}

		// // conifer data
		// if (isset($opts['conifer_data'])) {
		// 	$conifer_data = $opts['conifer_data'];

		// 	// if doesn't already exist, create new trees_confifer row
		// 	$result = $this->db->table('trees_conifer tc')
		// 		->where('tree_id', $tree_id)
		// 		->get();

		// 	$conifer_data['tree_id'] = $tree_id;

		// 	$this->db->table('trees_conifer');

		// 	if ($result) {
		// 		$this->db->where('tree_id', $tree_id);
		// 		$this->db->update($conifer_data);
		// 	} else {
		// 		$this->db->insert($conifer_data);
		// 	}
		// }

		// many to many tables
		if (isset($opts['joins'])) {
			$joins = $opts['joins'];

			$this->update_joins($tree_id, $joins, 'origins', 'origin_id', 'trees_origins');
			$this->update_joins($tree_id, $joins, 'eco_benefits', 'eco_benefit_id', 'trees_eco_benefits');
			$this->update_joins($tree_id, $joins, 'native_to', 'native_to_id', 'trees_native_to');
			$this->update_joins($tree_id, $joins, 'shapes', 'shape_id', 'trees_shapes');
			$this->update_joins($tree_id, $joins, 'light', 'light_id', 'trees_light');
			$this->update_joins($tree_id, $joins, 'soil', 'soil_id', 'trees_soil');
			$this->update_joins($tree_id, $joins, 'natural_habitat', 'natural_habitat_id', 'trees_natural_habitat');
			$this->update_joins($tree_id, $joins, 'common_uses', 'common_use_id', 'trees_common_uses');
			$this->update_joins($tree_id, $joins, 'transplanting', 'transplanting_id', 'trees_transplanting');
			$this->update_joins($tree_id, $joins, 'unique_attractions', 'unique_attraction_id', 'trees_unique_attractions');
			$this->update_joins($tree_id, $joins, 'tolerances', 'tolerance_id', 'trees_tolerances');
			$this->update_joins($tree_id, $joins, 'insects', 'insects_id', 'trees_insects');
			$this->update_joins($tree_id, $joins, 'diseases', 'disease_id', 'trees_diseases');
			// $this->update_joins($tree_id, $joins, 'conifer_leaf_structures', 'conifer_leaf_structure_id', 'trees_conifer_leaf_structures');
			// $this->update_joins($tree_id, $joins, 'conifer_cone_features', 'conifer_cone_feature_id', 'trees_conifer_cone_features');
		}
	}

	protected function update_joins($tree_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			// clear existing associations
			$this->db->table($join_table_name)->where('tree_id', $tree_id)->delete();

			// insert new associations
			$light = is_array($joins[$table_name]) ? $joins[$table_name] : explode(',', $joins[$table_name]);
			foreach ($light as $light_id) {
				$this->db->table($join_table_name)->insert(['tree_id' => $tree_id, $table_id_name => $light_id]);
			}
		}
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('trees');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			if (isset($opts['slug'])) {
				$this->db->where('slug', '=', $opts['slug']);
			}

			$tree = $this->db->get();

			$deleted_tree_id = $tree->id;

			$this->db->table('trees')->where('id', $deleted_tree_id)->delete();

			// remove joins
			$this->db->table('trees_origins')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_eco_benefits')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_native_to')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_shapes')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_light')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_soil')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_natural_habitat')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_common_uses')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_transplanting')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_tolerances')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_insects')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_diseases')->where('tree_id', $deleted_tree_id)->delete();
			// $this->db->table('trees_conifer_leaf_structures')->where('tree_id', $deleted_tree_id)->delete();
			// $this->db->table('trees_conifer_cone_features')->where('tree_id', $deleted_tree_id)->delete();

			// remove conifer data
			//$this->db->table('trees_conifer')->where('tree_id', $deleted_tree_id)->delete();
			
			// remove files
			$this->db->table('files_trees')->where('ref_id', $deleted_tree_id)->delete();

			return $deleted_tree_id;
		}

		return false;
	}

	public function get_all($opts = [], $isCount = false) 
	{
		$this->db->table('trees t');

		// only in category
		if (isset($opts['trees_category'])) {
			if (count($opts['trees_category']) > 0) {
				$this->db->in('t.trees_category_id', $opts['trees_category']);
			} else {
				// force no results since trees_category is queried but no trees_category is selected
				return [];
			}
		}

		// only in zones
		if (isset($opts['zones'])) {
			if (count($opts['zones']) > 0) {
				//$this->db->in('t.zone_id', $opts['zones']);
				$this->db->where('t.zone_id', '>=', $opts['zones'][0]);
			} else {
				// force no results since zones is queried but no zones is selected
				return [];
			}
		}

		// only in origins
		if (isset($opts['origins'])) {
			if (count($opts['origins']) > 0) {
				$this->db
					->innerJoin('trees_origins _to', '_to.tree_id', 't.id')
					->innerJoin('origins o', 'o.id', '_to.origin_id')
					->in('o.id', $opts['origins']);
			} else {
				// force no results since origin is queried but no origin is selected
				return [];
			}
		}

		// use search criteria
		if (isset($opts['like'])) {
			//genus
			$this->db			
				->leftJoin('genuses g', 'g.id', 't.genus_id')
				->groupBy('t.id');

			$this->db->grouped(function($q, $opts) {
				$q->like('t.common_name', '%'.$opts['like'].'%')
				->orLike('t.other_common_names', '%'.$opts['like'].'%')
				->orLike('t.specific_epithet', '%'.$opts['like'].'%')
				->orLike('t.other_species', '%'.$opts['like'].'%')
				->orLike('t.genus_id', '%g.id%');


			}, $opts);
		}

		if ($isCount) {
			 $this->db->select('DISTINCT t.id');

			 $result = $this->db->getAll();

			return count($result);
		} else {
			if (isset($opts['select'])) {
				$this->db->select(implode(',', $opts['select']));
			} else {
				$this->db->select('DISTINCT t.id, t.slug, t.common_name, t.trees_category_id');
			}

			if (isset($opts['offset'])) {
				$this->db->limit($opts['offset'], $opts['limit']);
			}

			// include images and category
			$this->db
				->select('GROUP_CONCAT(ft.name ORDER BY ft.sort_order, ft.name) AS images')
				->select('GROUP_CONCAT(ft.description ORDER BY ft.sort_order, ft.name) AS image_descriptions')
				->select('GROUP_CONCAT(DISTINCT c.slug) AS category')
				->leftJoin('files_trees ft', 'ft.ref_id', 't.id')
				->leftJoin('trees_category c', 't.trees_category_id', 'c.id')
				->groupBy('t.id');

			$result = $this->db->orderBy('common_name')->getAll();

			return $result;
		}
	}
}