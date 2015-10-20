var FreehandHandler = DrawHandler.extend({

	constructor: function (map) {
		this.base(map);
        this.type = "Freehand";
		this.begin = this.move = this.end = null;
	},

	start: function (mode) {
		this.base(mode);

		var scope = this,
            feature = this.feature = new google.maps.Polyline({
                map: this.map,
                clickable: false
            }),
            begin = this.begin = google.maps.event.addListenerOnce(this.map, 'mousedown', function(e){
                scope.map.setOptions({
                    draggable: false, 
                    zoomControl: false, 
                    scrollwheel: false, 
                    disableDoubleClickZoom: false
                });

                var move = scope.move = google.maps.event.addListener(scope.map, 'mousemove', function(e){
                    feature.getPath().push(e.latLng);
                });

                scope.end = google.maps.event.addListenerOnce(scope.map, 'mouseup', function(e){
                    scope.stop();
                    scope.complete();

                    scope.map.setOptions({
                        draggable: true, 
                        zoomControl: true, 
                        scrollwheel: true, 
                        disableDoubleClickZoom: true
                    });
                });
            });
	},

	stop: function () {
        this.base();
		google.maps.event.removeListener(this.begin);
        google.maps.event.removeListener(this.move);
        google.maps.event.removeListener(this.end);
        this.begin = this.move = this.end = null;
	}
});