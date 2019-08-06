<?php 
use Config\Config as Config;

$this->insert('header', $view_data );
$this->insert('featured', $view_data );
?>

<script>
// must put this above the html to redirect before rendering if needed
(function() {
    //check if item is in local storage
	if (localStorage.getItem('token')) {
		var token = localStorage.getItem('token');

		if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(); }
		else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
		
		//listen for response
		xhttp.onreadystatechange = function() {
		    if(xhttp.readyState == 4 && xhttp.status == 200) {
		    	var resp = null;
		    	try {
		    		resp = JSON.parse(this.response);
		    	} catch(e) {
		    		console.log("can't parse response");
		    	}

		    	if(resp.id) {
		    	  // show page
		    	  //console.log('show page');
		    	} else { 
		    	  accessDenied();
		    	}
		    }
		}

		//send ajax request
		try {
			xhttp.open("POST", "<?= Config::paths('ROOT_URL').'api/users/verify' ?>", true);
			xhttp.setRequestHeader('Accept', 'application/json, text/plain, */*');
			xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhttp.setRequestHeader('Authorization', 'Bearer '+token);
			//turn params into json and send
			xhttp.send();
		} catch(e) {
			console.log(e);
		}
	} else {
		accessDenied();
	}

	function accessDenied() {
		//redirect to access denied pager
		var location = window.location.hostname;
		window.location.assign('http://'+location+'/access_denied');
	} 		
})();
</script>

<div class="home-page site-wrapper">
    <div class="content-wrapper">
        <section id="hero">
            test text...
        </section>

        <section>
        <!-- test section begin -->
	  	<h1>Scroll down</h1>
		</section>

		<section class="sticky">
		  <blockquote>"You should totally subscribe to my channel now"<span></span></blockquote>
		  <img id="office" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/office1.png">
		  <img id="building" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/sky.jpg">
		  <div id="box"></div>
		</section>

		<section>
		  <h1>Scroll up</h1>
		</section>
		<!-- test section end -->

    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>



</div><!-- /site wrapper -->




