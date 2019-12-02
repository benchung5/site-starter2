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
	// var canRegister = false;
	// if(!isAdminPage && canRegister) {
	// 	serviceWorker('register');
	// } else {
	// 	serviceWorker('unregister');
	// }

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

	//audio buttons
	$( "#like-a-star" ).click(function() {
	  var audio = document.getElementById("audio-track");
	  
	  if ($("#like-a-star").hasClass("play")) {
	  	audio.pause();
	  	$( "#like-a-star .playing" ).html("");
	  } else {
	  	audio.play();
	  	$( "#like-a-star .playing" ).html(" (playing)");
	  }
	  $("#like-a-star").toggleClass("play");
	});
	$( "#on-christmas-eve" ).click(function() {
	  var audio = document.getElementById("audio-track2");
	  
	  if ($("#on-christmas-eve").hasClass("play")) {
	  	audio.pause();
	  	$( "#on-christmas-eve .playing" ).html("");
	  } else {
	  	audio.play();
	  	$( "#on-christmas-eve .playing" ).html(" (playing)");
	  }
	  $("#on-christmas-eve").toggleClass("play");
	});

	//preview buttons
	$( "#preview-one" ).click(function() {	  
	  $("#modal-one").toggleClass("on");
	});

	$( "#preview-two" ).click(function() {	  
	  $("#modal-two").toggleClass("on");
	});

	//close buttons
	$( "#modal-one .close" ).click(function() {	 
		//pause the video
		var $vid = $('#modal-one video');
		console.log($vid);
		if($vid[0]) {
			$vid[0].pause();
		  }
	  $("#modal-one").toggleClass("on");
	});

	$( "#modal-two .close" ).click(function() {
	  //stop the video
	  var $vid = $('#modal-two video');
	  if($vid[0]) {
	  	   $vid[0].pause();
	    }
	  $("#modal-two").toggleClass("on");
	});
	
})();
