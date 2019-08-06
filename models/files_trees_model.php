<?php
use Lib\Model;
use Lib\Utils;

class Files_trees_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get_all_by_ref_id($ref_id, $opts = [], $isCount = false) 
	{
		$this->db->table('files_trees ft');

		if ($isCount) {
			 $this->db->select('DISTINCT ft.id');

			 $result = $this->db->getAll();

			return count($result);
		} else {
			if (isset($opts['select'])) {
				$this->db->select(implode(',', $opts['select']));
			} else {
				$this->db->select('DISTINCT ft.id, ft.ref_id, ft.name, ft.sort_order, ft.extension, tft.name AS tag_name, ft.description');
			}

			$this->db->leftJoin('tags_files_trees tft','tft.id','ft.tag_id');
			$this->db->where('ref_id', $ref_id);

			$result = $this->db->getAll();

			return $result;
		}
	}

	public function add($data)
	{
		if (is_array($data)) {

			$this->db->table('files_trees')->insert($data);

			return $this->db->insertId();
		}
	}

	public function update_associations($ref_type, $ref_id, $deleted_images) 
	{
		$deleted_images = is_array($deleted_images) ?: explode(',', $deleted_images); 

		// compare new image associations with existing ones and adjust
		foreach ($deleted_images as $deleted_image) {
			$this->db->table('files_trees')
				->where('ref_id', (int)$ref_id)
				->where('name', $deleted_image)
				->delete();

			//also remove the actual uploaded files
			//todo: combine this with lib/uploads verion of this
			$path = realpath('./uploads');
			if (is_dir($path.'/'.$ref_type)) {
				$deleted_image_sml = preg_replace('/(\.[\w\d_-]+)$/i', '-sml$1', $deleted_image);
				$deleted_image_med = preg_replace('/(\.[\w\d_-]+)$/i', '-med$1', $deleted_image);
				unlink($path.'/'.$ref_type.'/'.$deleted_image);
				unlink($path.'/'.$ref_type.'/'.$deleted_image_sml);
				unlink($path.'/'.$ref_type.'/'.$deleted_image_med);
			}
		}
	}

	public function update($opts = []) 
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('files_trees');
			$this->db->where($opts['where'])->update($opts['update']);
		}
	}
}