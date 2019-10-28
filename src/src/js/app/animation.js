// alias's for these are defined in simpleWebpackConfig in gulpfile
import TweenLite from 'TweenLite';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

const animation = function() {
	//force go back to top of page on page reload
	// window.onbeforeunload = function () {
	//   window.scrollTo(0, 0);
	// }

	const controller = new ScrollMagic.Controller();
	//const controller = new ScrollMagic.Controller();

	// // how it all began text
	// var tl_hiab = new TimelineMax();
	// // tl_hiab.to('#how', 0.5, {opacity: 1});
	// // tl_hiab.to('#it', 0.5, {opacity: 1}, "=-0.3");
	// // tl_hiab.to('#all', 0.5, {opacity: 1}, "=-0.3");
	// // tl_hiab.to('#began', 0.5, {opacity: 1}, "=-0.3");
	// //tl_hiab.to('#keep-scrolling .arrow', 0.8, {y: 10, repeat: -1, yoyo:true, ease: Power1.easeInOut});
	// tl_hiab.to('#keep-scrolling', 1, {y: 10, ease: Power4.easeOut});

	// const scene_tl_hiab = new ScrollMagic.Scene({
	//   triggerElement: "#top-intro",
	//   triggerHook: "onLeave",
	//   duration: "100%"
	// })
	// // .setPin("#top-intro")
	// .setTween(tl_hiab)
	// .addTo(controller);

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
			
			tl_hiab.to('#keep-scrolling', 0.5, {opacity: 1});
			tl_hiab.to('#keep-scrolling .arrow', 0.8, {y: 10, repeat: -1, yoyo:true, ease: Power1.easeInOut});
		}, 500);
	});

	//dynamic load video
	function loadVideo() {
	  var $vid = $('video[data-src]:not([data-src=""])');
	  if($vid[0]) {
	    if (!$vid[0].src) {
	        //if it doesn't already have a source...
	        //change source of actual video element
	        $vid.each(function() {
	          var pathTovidSrc = $vid.data('src') ? $vid.data('src') : $vid.attr('src');
	          //update the source
	          $vid.attr('src', pathTovidSrc);
	        });

	        //change source of the source elments within
	        $('source[data-src]:not([data-src=""])').each(function() {
	          var $vidSrc = $(this);

	          var pathTovidSrc = $vidSrc.data('src') ? $vidSrc.data('src') : $vidSrc.attr('src');
	          //update the source
	          $vidSrc.attr('src', pathTovidSrc);
	        });
	    }
	  }
	}

	// scroll powered body text
	var tl_hiab_body = new TimelineMax();
	tl_hiab_body.to('#keep-scrolling', 1, {opacity: 0});
	tl_hiab_body.to('#body1', 2, {opacity: 1});
	tl_hiab_body.to('#body2', 2, {opacity: 1}, "=-1");
	tl_hiab_body.to('#body3', 2, {opacity: 1}, "=-1");

	const scene_hiab_body = new ScrollMagic.Scene({
	  triggerElement: "#body1",
	  triggerHook: "onCenter",
	  duration: "100%"
	})
	//.setPin(".sticky")
	.setTween(tl_hiab_body)
	.addTo(controller);

	/* ==========================================================================
	35 years in the making
	========================================================================== */

	// scroll powered 35 yrs
	var tl_35yrs = new TimelineMax({repeat:-1});
	tl_35yrs.to('#thirty-five-yrs #filmstrip', 15, {backgroundPosition: "-1000px 0px", ease: Linear.easeNone});


	const scene_tl_35yrs = new ScrollMagic.Scene({
	  triggerElement: "#body3",
	})
	.setTween(tl_35yrs)
	.addTo(controller);

	// ==============

	var tl_itm = new TimelineMax();
	tl_itm.to('#years-in-the-making', 5, {scale: 2});	
	
	const scene_tl_itm = new ScrollMagic.Scene({
		triggerElement: '#thirty-five-yrs',
		triggerHook: "onCenter",
		duration: "100%",
	})
	.setTween(tl_itm)
	.addTo(controller);

	/* ==========================================================================
	snowflakes christmas
	========================================================================== */

	var tl_sfc = new TimelineMax();
	tl_sfc.to('#snowflake-container', 10, {y: 0, opacity: 1, rotation: 360});
	tl_sfc.to('#snowking', 5, {x: 0, opacity: 1}, '=-5');
	tl_sfc.to('#snowflakes', 10, {x: 0, opacity: 1}, '=-5');
	tl_sfc.to('#christmas', 10, {x: 0, opacity: 1}, '=-5');
	tl_sfc.to('#imagine-this', 10, {y: 0, opacity: 1}, '=-5');
	tl_sfc.to('#smoke', 30, {y: -20}, '=-10');
	
	
	const scene_tl_sfc = new ScrollMagic.Scene({
		triggerElement: '#snowflakes-christmas',
		triggerHook: "onCenter",
		duration: "180%",
	})
	.setTween(tl_sfc)
	.addTo(controller);

	/* ==========================================================================
	dear santa
	========================================================================== */

	var tl_ds = new TimelineMax();
	
	tl_ds.to('#dear-santa-envelope', 1, {opacity: 1});
	tl_ds.to('#dear-santa-text h2', 0.5, {x: 0, opacity: 1}, '=-0.7');
	tl_ds.to('#dear-santa-text p', 1, {x: 0, opacity: 1}, '=-0.3');
	tl_ds.to('#dear-santa-envelope', 2, {y: 500}, 1,'=-1');
	
	
	const scene_tl_ds = new ScrollMagic.Scene({
		triggerElement: '#dear-santa',
		triggerHook: "onEnter",
		duration: "300%",
		offset: 60
	})
	.setTween(tl_ds)
	.addTo(controller);

	/* ==========================================================================
	icicles
	========================================================================== */

	var tl_ic = new TimelineMax();
	
	tl_ic.to('.icicles-one', 5, {y: -30});
	tl_ic.to('.icicles-five', 5, {y: -30}, "=-5");
	tl_ic.to('.icicles-four', 5, {y: -30}, "=-5");
	tl_ic.to('.icicles-two', 5, {y: 50}, "=-5");
	tl_ic.to('.icicles-three', 5, {y: 80}, "=-5");
	
	
	const scene_tl_ic = new ScrollMagic.Scene({
		triggerElement: '#dear-santa',
		triggerHook: "onEnter",
		duration: "200%"
	})
	.setTween(tl_ic)
	.addTo(controller);

	/* ==========================================================================
	north pole
	========================================================================== */

	var tl_np = new TimelineMax();

	tl_np.to('#north-pole-envelope', 2, {opacity: 1});
	tl_np.to('#north-pole-envelope', 5, {y: 200}, "=-2");
	tl_np.to('#north-pole-sign', 4, {x: 0, opacity: 1}, "=-4");
	tl_np.to('#shooting-star', 1, {opacity: 1}, "=-3");
	tl_np.to('#shooting-star', 4, {rotation: 40}, "=-4");
	tl_np.to('#shooting-star', 1, {opacity: 0}, "=-1");

	const scene_tl_np = new ScrollMagic.Scene({
		triggerElement: '#north-pole',
		triggerHook: "onCenter",
		duration: "120%",
		offset: -300
	})
	.setTween(tl_np)
	.addTo(controller);

	/* ==========================================================================
	boat
	========================================================================== */

	var tl_bt = new TimelineMax();

	
	tl_bt.to('#boat-sail-back', 1.5, {y: 0, opacity: 1});
	tl_bt.to('#boat-sail-front', 1.5, {y: 0, opacity: 1}, "=-0.5");
	tl_bt.to('#boat-flag', 1.5, {y: 0, opacity: 1}, "=-1");
	tl_bt.to('#santa-approved', 4, {y: 0, opacity: 1}, 4);
	tl_bt.to('#ready-for-delivery', 4, {y: 0, opacity: 1}, "=-2");
	// tl_bt.to('#boat-base', 2, {y: 0, opacity: 1}, "=-1");
	//tl_bt.to('#boat-holder', 1, 1, {y: 10, yoyo:true, ease: Power1.easeInOut});

	const scene_tl_bt = new ScrollMagic.Scene({
		triggerElement: '#boat',
		triggerHook: "onCenter",
		duration: "200%",
		// offset: -300
	})
	.setTween(tl_bt)
	.addTo(controller);

	/* ==========================================================================
	book
	========================================================================== */

	var tl_bk = new TimelineMax();

	tl_bk.to('#drawing', 0.5, {opacity: 0});
	tl_bk.to('#book #inner-one', 0.5, {opacity: 0}, "=-0.5");
	tl_bk.to('#elf-one', 0.5, {opacity: 1});
	tl_bk.to('#book #inner-two', 0.5, {opacity: 1}, "=-0.5");
	tl_bk.to('#elf-one', 0.5, {opacity: 0});
	tl_bk.to('#book #inner-two', 0.5, {opacity: 0}, "=-0.5");
	tl_bk.to('#elf-two', 0.5, {opacity: 1});
	tl_bk.to('#book #inner-three', 0.5, {opacity: 1}, "=-0.5");

	const scene_tl_bk = new ScrollMagic.Scene({
		triggerElement: '#book',
		triggerHook: "onLeave",
		duration: "100%",
		// offset: -300
	})
	.setPin("#book")
	.setTween(tl_bk)
	.addTo(controller);

	/* ==========================================================================
	video
	========================================================================== */

	var tl_v = new TimelineMax();
	
	tl_v.to('#trees-bg-far', 5, {y: 50});
	tl_v.to('#trees-bg-near', 5, {y: 75}, "=-5");
	tl_v.to('#video-envelope', 4, {y: 100}, 4);
	tl_v.to('#video-envelope-flap', 4, {y: 100}, 4);
	
	
	const scene_tl_v = new ScrollMagic.Scene({
		triggerElement: '#video',
		triggerHook: "onEnter",
		duration: "100%",
		offset: 100
	})
	.setTween(tl_v)
	.addTo(controller)
	.on('enter', function(e){
		loadVideo();
    });
	// .on('center', function(e){
	// 	var tl_vid = new TimelineMax();
	// 	tl_vid.to('#video-screen', 1.5, {y: -32, ease: Power1.easeInOut});
 //    });


}



export default animation;