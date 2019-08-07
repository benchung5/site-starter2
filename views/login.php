<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">

				<h1 class="margin-bottom">Login:</h1>
				<form id="loginform">
					<div class="form-group ">
						<label>User:</label>
						<input id="user" type="text" class="form-control" name="user" value="">
						<div class="error"></div>
					</div>
					<div class="form-group ">
						<label>Password:</label>
						<input id="password" type="text" class="form-control" name="password" value="">
						<div class="error"></div>
					</div>
					<div class="form-group ">
						<input type="hidden" class="form-control" name="key" value=''>
					</div>

					<a onclick="onFormSubmit()" class="button">Sign in</a>
				</form>

				<div id="login-error" class="error-text"> 
				</div>

			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>


	<script>

	function onFormSubmit() {
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

		    	// If request is good...
		    	if(resp.token) {
		    	  // - Save the JWT token
		    	  localStorage.setItem('token', resp.token);
		    	  //redirect to home page
		    	  var location = window.location.hostname;
		    	  window.location.assign('http://'+location);
		    	} else {
		    		if (resp.error) { 
			    	  // Show an error to the user
			    	  document.getElementById('login-error').innerHTML = resp.error;
		    		} else {
		    			// Show an error to the user
		    			document.getElementById('login-error').innerHTML = resp;
		    		}
		    	} 
		    }
		}

		//send ajax request
		try {
			xhttp.open("POST", "<?= Config::paths('ROOT_URL').'api/users/sign_in' ?>", true);
			xhttp.setRequestHeader('Accept', 'application/json, text/plain, */*');
			xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			var user = document.getElementById("user").value;
			var password = document.getElementById("password").value;
			var params = {
				email: user,
				key: 'sQPMBNCVkgs"f?>$%^*fgbfgbdSfds###$%#$bdFp%upsfbdf',
				password: password
			}
			//turn params into json and send
			xhttp.send(JSON.stringify(params));
		} catch(e) {
			console.log(e);
		}
	}

	</script>


</div><!-- /site wrapper -->


