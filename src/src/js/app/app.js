'use strict';

import $ from 'jquery';
window.$ = $;

//------

import isOnline from './onlineStatus';
import serviceWorker from './serviceWorker';
import loadVideo from './loadVideo';
import bodyClasses from './bodyClasses';
import windowSize from './windowSize';
import mobileMenu from './mobileMenu';
import animation from './animation';
import fooSlider from './fooSlider';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../react-app/config')[env];
const isAdminPage = (window.location.href.indexOf('admin') > -1);

/* ==========================================================================
load foundation plugins - keep this
========================================================================== */
// import whatInput from 'what-input';
// //import all foundation plugins
// // import Foundation from 'foundation-sites';
// //include specific foundation elements
// import './lib/foundation-explicit-pieces';

(function() {
	// turn on/off service worker
	var canRegister = false;
	if(!isAdminPage && canRegister) {
		serviceWorker('register');
	} else {
		serviceWorker('unregister');
	}

	//check if online/offline and handle it
	if(!isAdminPage) {
		isOnline();
	}

	//setup body classes
	bodyClasses();

	//window size utils
	windowSize();

	mobileMenu();

	fooSlider();

	//if on the home page
	if (window.location.pathname === '/') {
		animation();
	}
	
})();
