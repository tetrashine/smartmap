var DrawHandler = Base.extend({
	map: null,
	feature: null,
	type: null,
	events: {},
	Event: {
		DrawStart: "drawstart",
		DrawEnd: "drawend"
	},

	constructor: function (map) {
		this.map = map;
	},

	start: function (mode) {
		this.events[this.Event.DrawStart].call(this);
	},

	stop: function () {},

	getFeature: function () {
		return this.feature;
	},

	getType: function () {
		return this.type;
	},

	complete: function () {
		this.events[this.Event.DrawEnd].call(this, this.getFeature(), this.getType());
	},

	on: function(eventType, func) {
		this.events[eventType] = func;
	}
});