var GMapDrawHandler = DrawHandler.extend({

	constructor: function (map) {
		this.base(map);
		this.drawingManager = new google.maps.drawing.DrawingManager({
			map: map,
			drawingControl: false,
		    drawingControlOptions: {
				drawingModes: [
					google.maps.drawing.OverlayType.MARKER
				]
		    }
		});
	},

	start: function (mode) {
		this.base();
		var scope = this;

		this.type = mode;
		this.drawingManager.setOptions({
			drawingMode: mode
		});
		
		google.maps.event.addListenerOnce(this.drawingManager, 'overlaycomplete', function(event) {
			scope.feature = event.overlay;

			scope.drawingManager.setOptions({
				drawingMode: mode = null
			});

			scope.complete();
		});
	},

	stop: function () {
		this.base();
		this.drawingManager.setOptions({
			drawingMode: null
		});
	}
});