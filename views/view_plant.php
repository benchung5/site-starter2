
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
							<h1><?= Utils::sanitize($view_data['tree']->common_name) ?></h1>&nbsp;&nbsp;
							<h2 class="italic">(<?= Utils::sanitize($view_data['tree']->family_genus->genus_name) ?></span>&nbsp;<?= Utils::sanitize($view_data['tree']->specific_epithet) ?>)</h2>
						</div>

						<?php //print_r($view_data['tree']);  ?>

						<?php if ($view_data['tree']->images) : ?>
						<div class="images">

							<div class="fooslider-wrapper">
								<div class="fooslider">

									<?php 
									foreach ($view_data['tree']->images as $image) { 
										if (strpos($image->name, 'thumb') == false) {
											echo '<div class="slide"><div class="slide-inner">';
											echo '<img class="view-img" alt="' . Utils::sanitize($image->description) . '" src="'.Config::paths('ROOT_URL').'uploads/trees/'.Utils::sanitize($image->name).'" />';
											echo '</div></div>';
										}
									}
									?>

									<div class="fooslider-controls">
									  <a class="fs-prev">prev</a>
									  <a class="fs-next">next</a>
									</div>
								</div>
							</div>

						</div>
						<?php endif ?>

						<!-- don't sanitize body since we need html -->
						<div class="body-area"><?= $view_data['tree']->body ?></div>
					</div>
					<div class="small-12 large-4 columns sidebar">
						<span class="bold">Classification</span><br>

						<?= $view_data['tree']->other_common_names ? '<span>Other Names: ' . Utils::sanitize($view_data['tree']->other_common_names) . '</span><br>' : ''; ?>

						<?= $view_data['tree']->other_species ? '<span>Other Botanical Names: ' . Utils::sanitize($view_data['tree']->other_species) . '</span><br>' : ''; ?>
						
						<span>Family: <?= Utils::sanitize($view_data['tree']->family_genus->family_name) ?></span><br>
						<br>

						<span class="bold">Details</span><br>

						<?php
						$native_to = [];
						if ($view_data['tree']->native_to) {
							foreach ($view_data['tree']->native_to as $_native_to) {
								$native_to[] = $_native_to->name;
							}
							echo '<span>Native to: ';
							echo Utils::sanitize(implode(', ', $native_to));
							echo '</span><br>';
						}
						?>

						<?= $view_data['tree']->zone ? '<span>Hardy to zone: ' . Utils::sanitize($view_data['tree']->zone->name) . '</span><br>' : ''; ?>

						<?php
						$eco_benefits = [];
						if ($view_data['tree']->eco_benefits) {
							foreach ($view_data['tree']->eco_benefits as $_eco_benefit) {
								$eco_benefits[] = $_eco_benefit->name;
							}
							echo '<span>Eco Benefits: ';
							echo Utils::sanitize(implode(', ', $eco_benefits));
							echo '</span><br>';
						}
						?>

						<?php
						$natural_habitats = [];
						if ($view_data['tree']->natural_habitat) {
							foreach ($view_data['tree']->natural_habitat as $natural_habitat) {
								$natural_habitats[] = $natural_habitat->name;
							}
							echo '<span>Natural Habitat: ';
							echo Utils::sanitize(implode(', ', $natural_habitats));
							echo '</span><br>';
						}
						?>

						<?php
						$shapes = [];
						if ($view_data['tree']->shapes) {
							foreach ($view_data['tree']->shapes as $shape) {
								$shapes[] = $shape->name;
							}
							echo '<span>Shapes: ';
							echo Utils::sanitize(implode(', ', $shapes));
							echo '</span><br>';
						}
						?>

						<?php 

						if ($view_data['tree']->height_min && $view_data['tree']->height_max) {
							if ($view_data['tree']->height_min == $view_data['tree']->height_max) {
								echo '<span>Height: ' . Utils::sanitize($view_data['tree']->height_min) . 'ft</span><br>';
							} else {
								echo '<span>Height: ' . Utils::sanitize($view_data['tree']->height_min) . '-' . Utils::sanitize($view_data['tree']->height_max) . 'ft</span><br>';
							}	
						}

						if ($view_data['tree']->width_min && $view_data['tree']->width_max) {
							if ($view_data['tree']->width_min == $view_data['tree']->width_max) {
								echo '<span>width: ' . Utils::sanitize($view_data['tree']->width_min) . 'ft</span><br>';
							} else {
								echo '<span>width: ' . Utils::sanitize($view_data['tree']->width_min) . '-' . Utils::sanitize($view_data['tree']->width_max) . 'ft</span><br>';
							}	
						}

						?>

						<?= $view_data['tree']->growth_rate ? '<span>Growth Rate: ' . Utils::sanitize($view_data['tree']->growth_rate) . '</span><br>' : ''; ?>

						<?= $view_data['tree']->lifespan_min && $view_data['tree']->lifespan_max ? '<span>Lifespan: ' . Utils::sanitize($view_data['tree']->lifespan_min) . '-' . Utils::sanitize($view_data['tree']->lifespan_max) . ' years</span><br>' : ''; ?>

						<?php
						$unique_attractions = [];
						if ($view_data['tree']->unique_attractions) {
							foreach ($view_data['tree']->unique_attractions as $unique_attraction) {
								$unique_attractions[] = $unique_attraction->name;
							}
							echo '<span>Unique Attractions: ';
							echo Utils::sanitize(implode(', ', $unique_attractions));
							echo '</span><br>';
						}
						?>

						<?php
						$tolerances = [];
						if ($view_data['tree']->tolerances) {
							foreach ($view_data['tree']->tolerances as $tolerance) {
								$tolerances[] = $tolerance->name;
							}
							echo '<span>Tolerances: ';
							echo Utils::sanitize(implode(', ', $tolerances));
							echo '</span><br>';
						}
						?>

						<?php
						$common_uses = [];
						if ($view_data['tree']->common_uses) {
							foreach ($view_data['tree']->common_uses as $common_use) {
								$common_uses[] = $common_use->name;
							}
							echo '<span>Common Uses: ';
							echo Utils::sanitize(implode(', ', $common_uses));
							echo '</span><br>';
						}
						?>

						<?php
						$insects = [];
						if ($view_data['tree']->insects) {
							foreach ($view_data['tree']->insects as $insect) {
								$insects[] = $insect->name;
							}
							echo '<span>Insects: ';
							echo Utils::sanitize(implode(', ', $insects));
							echo '</span><br>';
						}
						?>

						<?php
						$diseases = [];
						if ($view_data['tree']->diseases) {
							foreach ($view_data['tree']->diseases as $disease) {
								$diseases[] = $disease->name;
							}
							echo '<span>Diseases: ';
							echo Utils::sanitize(implode(', ', $diseases));
							echo '</span><br>';
						}
						?>

						<br><span class="bold">Cultivation</span><br>

						<?php
						$light = [];
						if ($view_data['tree']->light) {
							foreach ($view_data['tree']->light as $_light) {
								$light[] = $_light->name;
							}
							echo '<span>Light: ';
							echo Utils::sanitize(implode(', ', $light));
							echo '</span><br>';
						}
						?>

						<?php
						$transplanting = [];
						if ($view_data['tree']->transplanting) {
							foreach ($view_data['tree']->transplanting as $_transplanting) {
								$transplanting[] = $_transplanting->name;
							}
							echo '<span>transplanting: ';
							echo Utils::sanitize(implode(', ', $transplanting));
							echo '</span><br>';
						}
						?>

						<?php
						$soil = [];
						if ($view_data['tree']->soil) {
							foreach ($view_data['tree']->soil as $_soil) {
								$soil[] = $_soil->name;
							}
							echo '<span>Soil: ';
							echo Utils::sanitize(implode(', ', $soil));
							echo '</span><br>';
						}
						?>

						<?php
						// if ($view_data['tree']->soil) {
						// 	echo '<span>Soil:<br>';
						// 	echo '<ul> ';
						// 	foreach ($view_data['tree']->soil as $_soil) {
						// 		echo '<li>' . Utils::sanitize($_soil->name) . '</li>';
						// 	}
						// 	echo '</ul><br>';
						// }
						?>

					</div>
				</div>

			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->