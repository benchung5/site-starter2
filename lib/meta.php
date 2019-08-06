<?php
namespace Lib;

class Meta
{
	protected static $page_title = '';
	protected static $description = '';

	public function __construct() {
	}

	public static function set_page_title($title) {
		self::$page_title = $title . ' | ' . SITE_TITLE;
	}

	public static function get_page_title() 
	{
		return self::$page_title;
	}

	public static function set_page_description($description) {
		self::$description = $description;
	}

	public static function get_page_description() 
	{
		return self::$description;
	}
}