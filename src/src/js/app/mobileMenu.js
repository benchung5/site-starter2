// alias's for these are defined in simpleWebpackConfig in gulpfile
import TweenLite from 'TweenLite';

const mobileMenu = function() {
	/* ==========================================================================
	mobile menu
	========================================================================== */

	var mobileMenuOpen = false;

	var menuButtonHolder = document.querySelector(".mobile-menu-button");
	var menuHolder = document.querySelector(".mobile-menu-container");

	if (menuButtonHolder && menuHolder) {
		var menuButton = menuButtonHolder.querySelector(".grid-button");

		menuButton.addEventListener('click', function() {

			if(!mobileMenuOpen) {
				//open menu
				TweenLite.to(menuHolder, 0.5, {
					autoAlpha: 1,
					onStart: function() {
						menuButtonHolder.style.position = 'fixed';
					}
				});
				mobileMenuOpen = true;
			} else {
				//close menu
				TweenLite.to(menuHolder, 0.5, {
					autoAlpha: 0,
					onStart: function() {
						menuButtonHolder.style.position = 'absolute';
					}	
				});
				mobileMenuOpen = false;
			}

			$(menuButton).toggleClass('close');
		});
	}
}

export default mobileMenu;