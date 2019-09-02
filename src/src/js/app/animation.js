// alias's for these are defined in simpleWebpackConfig in gulpfile
import TweenLite from 'TweenLite';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

const animation = function() {	
	const controller = new ScrollMagic.Controller();

	/* ==========================================================================
	how it all began
	========================================================================== */

	window.addEventListener("contentLoaded", function(event) {
		setTimeout(function() {
			// how it all began text
			var tl_hiab = new TimelineMax();
			tl_hiab.to('#how', 0.5, {opacity: 1});
			tl_hiab.to('#it', 0.5, {opacity: 1}, "=-0.3");
			tl_hiab.to('#all', 0.5, {opacity: 1}, "=-0.3");
			tl_hiab.to('#began', 0.5, {opacity: 1}, "=-0.3");
			tl_hiab.to('#body1', 2, {opacity: 1}, "=-0.3");
			// tl_hiab.to('#keep-scrolling', 0.5, {opacity: 1}, "=-0.3");
			// tl_hiab.to('#keep-scrolling .arrow', 0.8, {y: 10, repeat: -1, yoyo:true, ease: Power1.easeInOut});
			// tl_hiab.to('#keep-scrolling', 0.5, {opacity: 0});
		}, 500);
	});

	// scroll powered body text
	var tl_hiab_body = new TimelineMax();
	tl_hiab_body.to('#body2', 2, {opacity: 1});
	tl_hiab_body.to('#body3', 2, {opacity: 1}, "=-1");

	const scene_hiab_body = new ScrollMagic.Scene({
	  triggerElement: "#how-it-began",
	  triggerHook: "onLeave",
	  duration: "100%"
	})
	//.setPin(".sticky")
	.setTween(tl_hiab_body)
	.addTo(controller);

	/* ==========================================================================
	how it all began
	========================================================================== */

	// scroll powered 35 yrs
	var tl_35yrs = new TimelineMax({repeat:-1});
	tl_35yrs.to('#thirty-five-yrs #filmstrip', 15, {backgroundPosition: "-1000px 0px", ease: Linear.easeNone});


	const scene_tl_35yrs = new ScrollMagic.Scene({
	  triggerElement: "#body3",
	})
	.setTween(tl_35yrs)
	.addTo(controller);

	/* ==========================================================================
	snowflakes christmas
	========================================================================== */

	var tl_sfc = new TimelineMax();
	tl_sfc.to('#snowflake-container', 10, {y: 0, opacity: 1, rotation: 360});
	tl_sfc.to('#snowking', 5, {x: 0, opacity: 1}, '=-5');
	tl_sfc.to('#snowflakes', 10, {x: 0, opacity: 1}), '=-40';
	tl_sfc.to('#christmas', 10, {x: 0, opacity: 1}, '=-5');
	tl_sfc.to('#smoke', 10, {y: -20}, '=-5');
	
	
	const scene_tl_sfc = new ScrollMagic.Scene({
		triggerElement: '#snowflakes-christmas',
		triggerHook: "onLeavee",
		duration: "200%"
	})
	.setTween(tl_sfc)
	.addTo(controller);
}



export default animation;