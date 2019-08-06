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
}

export default animation;