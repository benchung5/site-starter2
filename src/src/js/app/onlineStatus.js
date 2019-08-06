/* ==========================================================================
// handle online/offline
========================================================================== */

 const isOnline = function isOnline() {
	// tell users that they are offline/online
	const that = this;
	window.addEventListener('load', function() {

		function updateOnlineStatus(event) {
			var condition = navigator.onLine ? "online" : "offline";

			if(condition == 'offline') {
				$('body').addClass('offline');
				$('.offline-modal').addClass('on');
				console.log('offline');
				setTimeout(() => {
					$('.offline-modal').removeClass('on');
				}, 1500);

			} else {
				$('body').removeClass('offline');
				$('.offline-modal').removeClass('on');
				console.log('online');
			}
		}

		window.addEventListener('online',  updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);
	});
}

export default isOnline;
