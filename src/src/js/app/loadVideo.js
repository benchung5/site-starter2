/* ==========================================================================
// dynamic video loading
========================================================================== */

const loadVideo = function(selector, callback) {
	  if(document.querySelector(selector)) {
	    var $vid = $(selector);

	    if (!$vid[0].src) {
	        //if it doesn't already have a source...
	        //change source of actual video element
	        $vid.each(function() {
	          var pathTovidSrc = $vid.data('src') ? $vid.data('src') : $vid.attr('src');
	          //update the source
	          $vid.attr('src', pathTovidSrc);
	        });

	        //change source of the source elments within
	        $('source[data-src]:not([data-src=""])').each(function(){
	          var $vidSrc = $(this);

	          var pathTovidSrc = $vidSrc.data('src') ? $vidSrc.data('src') : $vidSrc.attr('src');
	          //update the source
	          $vidSrc.attr('src', pathTovidSrc);
	        });
	    }
	    //play the video
	    $vid[0].play();
	  }

	  //give a bit of time for src to async load
	  setTimeout(() => {
	  	callback();
	  }, 100)
	  
	}

export default loadVideo;

