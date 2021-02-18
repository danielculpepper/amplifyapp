/*
	Fractal by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500
			});

})(jQuery);

function setSubscriberCookie(coName,cVal) {
	document.cookie = coName + "=" + cVal + ";" + ";path=/";
}
function getCookie(name) {
	// Split cookie string and get all individual name=value pairs in an array
	var cookieArr = document.cookie.split(";");

	// Loop through the array elements
	for(var i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");

		/* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
		if(name == cookiePair[0].trim()) {
			// Decode the cookie value and return
			return decodeURIComponent(cookiePair[1]);
		}
	}

	// Return null if not found
	return null;
}
function alertCookie(){alert(document.cookie);}
function subButton() {window.admiral('show','transact.subscribe');}
function loginButton()
{
	if (getCookie("subscription") == "False") {
		window.admiral('show','transact.login');
	}
	else{
		alert("Already Logged in.")
	}

}
function manageButton() {
	window.admiral('show','transact.manage');
	window.admiral('after','transact.loggedOut', function(status) {
		if (status.value) {
			//Run code if user is logged in
			setSubscriberCookie("subscription","False");
			document.getElementById("s1").innerHTML = "Please subscribe";

		}
	})
}








window.admiral = window.admiral || function() {(admiral.q = admiral.q || []).push(arguments)};

window.admiral("after", "measure.detected", function(user) {


	if(user.subscribed) {
		//run code for subscribers
		setSubscriberCookie("subscription","True");
		//remove add and replace with text
		document.getElementById("s1").innerHTML = "Thanks for being a Subscriber!";
		window.admiral("targeting","set","isSub",user.subscribed.toString());

	}
	else{
		setSubscriberCookie("subscription","False");
		document.getElementById("s1").innerHTML = "Please subscribe :)";
		window.admiral("targeting","set","isSub",user.subscribed.toString());

	}
});
window.admiral('after','transact.loggedIn', function(status) {
	if (status.value) {
		//Run code if user is logged in
		setSubscriberCookie("subscription","True");
		document.getElementById("s1").innerHTML = "Thanks for Subscribing";
	}
})
window.admiral('after','transact.loggedOut', function(status) {
	if (status.value) {
		//Run code if user is logged in
		setSubscriberCookie("subscription","False");
		document.getElementById("s1").innerHTML = "Please subscribe";

	}
})





