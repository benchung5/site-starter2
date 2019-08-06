<?php 
require_once './vendor/autoload.php';
use Config\Config;
use Lib\Utils;
use Lib\Db;

Config::define_constants();

// load articles model
$path = Config::paths('MODEL_PATH').'articles_model.php';
if (file_exists($path)) {
	include_once($path);
}

// load plants model
$path = Config::paths('MODEL_PATH').'trees_model.php';
if (file_exists($path)) {
	include_once($path);
}

$articles = new Articles_model();
$plants = new Trees_model();

$articles = $articles->get_all();
$plants = $plants->get_all();

$base_url = "https://naturewithus.com/";

header("Content-Type: application/xml; charset=utf-8");

echo '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL; 

echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' . PHP_EOL;

//static pages
echo '<url><loc>https://naturewithus.com/about/</loc><changefreq>daily</changefreq><priority>0.9</priority></url>';
echo '<url><loc>https://naturewithus.com/contact/</loc><changefreq>contact</changefreq><priority>0.8</priority></url>';

//articles
foreach ($articles as $article) {
 echo '<url>';
 echo '<loc>'.$base_url. 'articles/view/' . $article->slug .'/</loc>';
 echo '<changefreq>daily</changefreq>';
 echo '<priority>1.0</priority>';
 echo '</url>';
}

//plants
foreach ($plants as $plant) {
 echo '<url>';
 echo '<loc>'.$base_url. 'plants/view/' . $plant->slug .'/</loc>';
 echo '<changefreq>daily</changefreq>';
 echo '<priority>1.0</priority>';
 echo '</url>';
}

echo '</urlset>' . PHP_EOL;
?>