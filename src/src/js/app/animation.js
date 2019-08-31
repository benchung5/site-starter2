// alias's for these are defined in simpleWebpackConfig in gulpfile
import TweenLite from 'TweenLite';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

const animation = function() {	
	const controller = new ScrollMagic.Controller();

	// scroll powered
	var tl = new TimelineMax({onUpdate:updatePercentage});
	tl.from('blockquote', .5, {x:200, opacity: 0});
	tl.from('span', 1, { width: 0}, "=-.5");
	tl.from('#office', 1, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
	tl.from('#building', 1, {x:200, opacity: 0, ease: Power4.easeInOut}, "=-.7");

	const scene = new ScrollMagic.Scene({
	  triggerElement: ".sticky",
      triggerHook: "onLeave",
      duration: "100%"
	})
	.setPin(".sticky")
	.setTween(tl)
	.addTo(controller);

	function updatePercentage() {
	  //percent.innerHTML = (tl.progress() *100 ).toFixed();
	  tl.progress();
	  //console.log(tl.progress());
	}

	// tween powered
	var tl2 = new TimelineMax();
	tl2.from("#box", 1, {opacity: 0, scale: 0});
	tl2.to("#box", .5, {left: "20%", scale: 1.3, borderColor: 'white', borderWidth: 12, boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.09)'})

	const scene2 = new ScrollMagic.Scene({
	  triggerElement: "blockquote"
	})
	.setTween(tl2)
	.addTo(controller);

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
		}, 500);
	});

	// scroll powered body text
	var tl_hiab_body = new TimelineMax();
	tl_hiab_body.to('#body1', 0.5, {opacity: 1});
	tl_hiab_body.to('#body2', 0.5, {opacity: 1}, "2");
	tl_hiab_body.to('#body3', 0.5, {opacity: 1}, "4");

	const scene_hiab_body = new ScrollMagic.Scene({
	  triggerElement: "#how-it-began",
	  triggerHook: "onLeave",
	  duration: "100%"
	})
	.setTween(tl_hiab_body)
	.addTo(controller);

	//keep scrolling
	var tl_hiab_ks = new TimelineMax();
	tl_hiab_ks.to('#keep-scrolling .arrow', 0.8, {y: 10, repeat: -1, yoyo:true, ease: Power1.easeInOut});

	const scene_hiab_ks = new ScrollMagic.Scene({
	  triggerElement: "#body3",
	})
	.setTween(tl_hiab_ks)
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

}



export default animation;