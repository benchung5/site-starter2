const bodyClasses = function() {
	/* ==========================================================================
	// bowser
	========================================================================== */

	//browsers:
	// safari
	// firefox
	// chrome
	// msedge
	// msie
	// mobile
	// ios

	if (bowser.msedge) {
	  //need this since modernizr doesn't add this one
	  $('body').addClass('msedge');
	}
	if (bowser.safari) {
	  $('body').addClass('safari');
	}
	if (bowser.iPhone) {
	  $('body').addClass('iphone');
	}
	if (bowser.mobile && bowser.safari && bowser.version <= 8) {
	  $('body').addClass('iphone-8-or-less');
	}
	if (bowser.tablet) {
	  $('body').addClass('tablet');
	}
	if (!bowser.tablet && !bowser.mobile) {
	  $('body').addClass('desktop');
	}
	if (bowser.mobile) {
	  $('body').addClass('mobile');
	}

	/* ==========================================================================
	// body class(front-end, admin)
	========================================================================== */

	$('body').addClass(getClassFromUrl());
	
	function getClassFromUrl() {
	  var path = window.location.pathname;

	    if(path === '/admin') {
	    	return 'admin';
	    } else {
	    	return 'front-end';
	    } 
	}
}

export default bodyClasses;