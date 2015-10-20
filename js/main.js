requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
		//'jsviews': 'libs/jsviews.min'
		'async': 'libs/require/async',
    },
    
    shim: {
    	
    }
});

// Start the main app logic.
requirejs([
	//'jsviews'
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBDUZ8VYSUakCBoxM0RIFcqsYu_brtmv4g'
], function () {
	console.log(1);
	function initMap() {
		var map = new google.maps.Map(document.getElementById("map-canvas"), {
			center: new google.maps.LatLng(51.508742, -0.120850),
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		console.log(4);
	}

	console.log(2);
	google.maps.event.addDomListener(window, 'load', initMap);
	console.log(3);
});