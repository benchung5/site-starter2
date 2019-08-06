<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">

				<div class="row">
					<div class="small-12 large-8 columns">
						<div class="title-area">
							<h1>Contact Us</h1>	
						</div>
						<div class="body-area">
							<form class="contact" name="htmlform" method="post" action="send_email">
								<div class="contact-input">
									<input   type="text" name="name" maxlength="50" size="30" placeholder="name">
								</div>
								<div class="contact-input">
									<input  class="contact-input" type="text" name="email" maxlength="80" size="30" placeholder="email">
								</div>
								<div class="contact-input">
									<textarea  class="contact-input" name="message" maxlength="1000" cols="25" rows="6" placeholder="message"></textarea>
								</div>
								<div class="contact-input">
									<input class="button contact-input" type="submit" value="Submit">								
								</div>
							</form>
						</div>
					</div>
					<div class="small-12 large-4 columns sidebar">
						...
					</div>
				</div>
			</div>

		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->