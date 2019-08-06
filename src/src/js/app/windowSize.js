const windowSize = function() {
	/* ==========================================================================
	testing
	========================================================================== */

	//media size
	$(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
	  // newSize is the name of the now-current breakpoint, oldSize is the previous breakpoint
	  // console.log(newSize);
	});
}

export default windowSize;