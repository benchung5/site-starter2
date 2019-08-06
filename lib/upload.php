<?php
namespace Lib;
// import the Intervention Image Manager Class
use Intervention\Image\ImageManagerStatic as Image;
use Lib\Utils;
use Lib\Controller;

class Upload
{
	public function __construct() {
		parent::__construct();
	}

	public function remove($ref_type, $ref_id) 
	{
		if ($ref_type == 'articles') {
			$files = Controller::load_model('files_model');
		} elseif ($ref_type == 'trees') {
			$files = Controller::load_model('files_trees_model');
		}

		$result = $files->get_all_by_ref_id($ref_id, [], false);

		foreach ($result as $file) {
			$path = './uploads/'.$ref_type.'/'.$file->name;

			if (file_exists($path))
			{
				//delete the file
				unlink($path);
				unlink('./uploads/'.$ref_type.'/'.pathinfo($file->name, PATHINFO_FILENAME).'-med.'.pathinfo($file->name, PATHINFO_EXTENSION));
				unlink('./uploads/'.$ref_type.'/'.pathinfo($file->name, PATHINFO_FILENAME).'-sml.'.pathinfo($file->name, PATHINFO_EXTENSION));

				//to test unlink
				// if (!unlink($path)) {
				//   echo ("Error deleting $path or med/sml versions");
				// }
			} else {
				//echo ('associated file: $path already deleted');
			}
		}
	}

	public function upload($ref_type, $ref_id, $data) 
	{
		if ($_FILES) {
			if ($ref_type == 'articles') {
				$files = Controller::load_model('files_model');
			} elseif ($ref_type == 'trees') {
				$files = Controller::load_model('files_trees_model');
			}

			//image info fields
			$imgInfoFields = [];
			foreach ($data as $key => $value) {
				$isImgInfoField = strpos($key, 'image_');
				
				if ($isImgInfoField !== false) {
					$imgInfoFields[] = explode(',', $value);
				}
			}

			$files_data = self::upload_files($ref_type);
			//save the file data to the db

			if (! $files_data['error']) {

				$count = 0;
				foreach ($files_data['files'] as $index => $file_data) {
					//start at original image version
					$isOriginalField = strpos($index, '_original');
					if ($isOriginalField !== false) {
						$file_data['ref_id'] = $ref_id;
						$file_data['sort_order'] = $count;
						$file_data['tag_id'] = $imgInfoFields ? $imgInfoFields[$count][0] : '';
						$file_data['description'] = $imgInfoFields[$count][1];
						$new_id = $files->add($file_data);
						$new_name = pathinfo($file_data['name'], PATHINFO_FILENAME).'-'.$new_id.'.'.pathinfo($file_data['name'], PATHINFO_EXTENSION);
						//update filename with new file id
						$files->update(['where' => ['id' => $new_id], 'update' => ['name' => $new_name]]);

						// move file, append new id, delete temp file
						$destination_original = './uploads/'.$ref_type.'/'.$new_name;
						rename($file_data['tmp_name'], $destination_original);
						self::constrain_img($destination_original);

						// do cropped version (med)
						$croppedVersionKey = str_replace('_original', '_cropped', $index);
						$new_name = pathinfo($file_data['name'], PATHINFO_FILENAME).'-'.$new_id.'-med.'.pathinfo($file_data['name'], PATHINFO_EXTENSION);
						$destination_cropped = './uploads/'.$ref_type.'/'.$new_name;
						rename($files_data['files'][$croppedVersionKey]['tmp_name'], $destination_cropped);
						
						// do small cropped version
						$new_name = pathinfo($file_data['name'], PATHINFO_FILENAME).'-'.$new_id.'-sml.'.pathinfo($file_data['name'], PATHINFO_EXTENSION);
						$destination_sml = './uploads/'.$ref_type.'/'.$new_name;
						self::create_thumb($destination_cropped, $destination_sml, 150, 150);

						$count++;
					}
					//if is cropped image version
					$isOriginalField = strpos($index, '_cropped');
					if ($isOriginalField !== false) {
						
					}
				}

				foreach ($files_data['files'] as $index => $file_data) {
					//if is cropped image version
					$isOriginalField = strpos($index, '_cropped');
					if ($isOriginalField !== false) {
						
					}
				}
			}
		} else {
			// no files to upload
			return false;
		}

	}

	public static function upload_files($ref) 
	{
		$path = realpath('./uploads');
		if (! is_dir($path.'/'.$ref.'/temp')) {
			// development mode
			mkdir($path.'/'.$ref.'/temp', 0777, true);
			chmod($path.'/'.$ref, 0777);
			chmod($path.'/'.$ref.'/temp', 0777);
		}
		$path = $path.'/'.$ref.'/temp';
				
		// result info list
		$result = array('error' => false, 'files' => array());
		
		foreach ($_FILES as $field_name => $file) {
			$file_count = is_array($_FILES[$field_name]['error']) ? count($_FILES[$field_name]['error']) : 1;
			
			if ($file_count == 1 && $_FILES[$field_name]['error'] != UPLOAD_ERR_NO_FILE) {
	            // if just one file
				$result['files'][$field_name] = self::upload_transfer($ref, $path, $field_name);
			} elseif ($file_count > 1) {
	            // if multiple files
				for ($i=0; $i<$file_count; $i++) {
					if ($_FILES[$field_name]['error'][$i] == UPLOAD_ERR_NO_FILE) {
						continue;
					}
					//move to temp folder and return info
					$result['files'][$field_name][$i] = self::upload_transfer($ref, $path, $field_name, $i);
				}
			}
		}
		
		// Check for submitted files
		if (count($result['files']) == 0) {
			$result['error'] = 'No files provided';
		}

	    return $result;
	}

	protected function upload_transfer($ref, $destination, $field_name, $index = null)
	{
		$result = array(
			'ref_type'  => $ref,
			'name'		=> ($index == null ? $_FILES[$field_name]['name'] : $_FILES[$field_name]['name'][$index]),
			'type'		=> ($index == null ? $_FILES[$field_name]['type'] : $_FILES[$field_name]['type'][$index]),
			'error'		=> ($index == null ? $_FILES[$field_name]['error'] : $_FILES[$field_name]['error'][$index]),
			'size'		=> ($index == null ? $_FILES[$field_name]['size'] : $_FILES[$field_name]['size'][$index])
		);

		$result['extension'] = pathinfo($result['name'], PATHINFO_EXTENSION);

		//add on a hash
		if (! array_key_exists('hash', $result) || empty($result['hash'])) {
		    $result['hash'] = md5(microtime().print_r($result, true));
		}

		$temp_name	= ($index == null) ? $_FILES[$field_name]['tmp_name'] : $_FILES[$field_name]['tmp_name'][$index];
		$filename = $result['hash'].'.'.$result['extension'];
		$target = $destination.'/'.$filename;
		$result['tmp_name'] = $target;

		// move and overrite if exists
		$ok = move_uploaded_file($temp_name, $target);
		//$ok = @move_uploaded_file($result['tmp_name'], $target);

	    if (! $ok) {
	    	$result['error'] = 'unable to move uploaded file';
	    }
		
		return $result;
	}

	public function constrain_img($path)
	{
	  // constrain to max size
	  // read image from file
	  $img = Image::make($path);
	  
	  $max_width = 600;
	  $max_height = 600;

	  if ($img->width() > $max_width || $img->height() > $max_height) {
	    // resize to maximum width and maxium height
	    $img->resize($max_width, $max_height, function ($constraint) {
	        // constraining the aspect ratio
	        $constraint->aspectRatio();
	        // prevent possible upsizing
	        $constraint->upsize();
	      });
	  }

	  return true;
	}

	public function create_thumb($source, $destination, $width, $height) {
		//create thumb version
		$img = Image::make($source);
		// crop the best fitting ratio and resize
		$img->fit($width, $height, function ($constraint) {
		    $constraint->upsize();
		})->save($destination);
	}
}