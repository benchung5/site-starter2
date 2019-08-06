
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">

				<div class="row">
					<div class="small-12 large-8 columns">
						<div class="title-area">
							<h1><?= $view_data['article']->name ?></h1>
						</div>
						<!-- don't sanitize body since we need html -->
						<div class="body-area"><?= $view_data['article']->body ?></div>
					</div>
					<div class="small-12 large-4 columns sidebar">
						<span>Pubilished: <?= Utils::sanitize($view_data['article']->created_on) ?></span><br>
						<?php
						$categories = [];
						if ($view_data['article']->categories) {
							foreach ($view_data['article']->categories as $category) {
								$categories[] = $category->name;
							}
						}
						?>
						<span>Categories: <?= $view_data['article']->categories ? Utils::sanitize(implode(', ', $categories)) : ''; ?><br>
					</div>
				</div>
			</div>

		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->