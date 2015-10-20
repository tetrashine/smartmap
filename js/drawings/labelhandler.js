var LabelHandler = DrawHandler.extend({

	constructor: function (map) {
		this.base(map);
		this.text = "";
		this.type = "Label";
		this.begin = null;
	},

	start: function (mode) {
		this.base(mode);

		var scope = this,
			begin = this.begin = google.maps.event.addListenerOnce(this.map, 'mousedown', function(e){
       			scope.feature = new MapLabel({
			        text: scope.text,
			        position: e.latLng,
			        map: scope.map,
			        fontSize: 35,
			        align: 'center'
			    });
 
			    scope.begin = null;
			    scope.complete();
        	});
	},

	stop: function () {
		this.base();
		google.maps.event.removeListener(this.begin);
        this.begin = null;
	},

	setText: function (text) {
		this.text = text;
	}
});