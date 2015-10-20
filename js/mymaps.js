
function LayerFeature(opts) {
	this.id = opts.id || "";
	this.layerId = opts.layerId;
	this.name = opts.name || "";
	this.type = opts.type || "";
	this.typeClass = "";
	this.obj = opts.obj;

	this.init();
}

LayerFeature.prototype.init = function() {
	switch(this.type) {
		case google.maps.drawing.OverlayType.MARKER:
			this.typeClass = "icon-point";
			break;
		case google.maps.drawing.OverlayType.POLYGON:
			this.typeClass = "icon-polygon";
			break;
        case google.maps.drawing.OverlayType.POLYLINE:
        	this.typeClass = "icon-polyline";
			break;
		case "Freehand":
        	this.typeClass = "icon-freehand";
			break;
		case google.maps.drawing.OverlayType.CIRCLE:
		case google.maps.drawing.OverlayType.RECTANGLE:
		default:
			this.typeClass = "icon-point";
			break;
	}
}

LayerFeature.prototype.remove = function() {
	this.obj.setMap(null);
}

LayerFeature.prototype.changeName = function(name) {
	this.name = name;
}

LayerFeature.prototype.getId = function() {
	return this.id;
}

function MapLayer(opts) {
	this.layerId = opts.layerId || "";
	this.mapId = opts.mapId || "";
	this.id = opts.id || "";
	this.name = opts.name || "";
	this.features = [];
}

MapLayer.prototype.getDefaultFeatureName = function(type) {
	var typeName = "Feature";
	switch(type) {
		case google.maps.drawing.OverlayType.MARKER:
			typeName = "Point";
			break;
		case google.maps.drawing.OverlayType.POLYGON:
			typeName = "Polygon";
			break;
        case google.maps.drawing.OverlayType.POLYLINE:
        	typeName = "Polyline";
			break;
		case google.maps.drawing.OverlayType.CIRCLE:
			typeName = "Circle";
			break;
		case google.maps.drawing.OverlayType.RECTANGLE:
			typeName = "Rectangle";
		case "Freehand":
			typeName = "Drawing";
		case "Label":
			typeName = "Label";
			break;
	}

	return typeName + " " + (this.features.length + 1);	
}

MapLayer.prototype.getId = function(obj, type) {
	return this.id;
}

MapLayer.prototype.addFeature = function(obj, type) {

	var feature = new LayerFeature({
		id: "f" + this.features.length,
		layerId: this.id,
		name: this.getDefaultFeatureName(type),
		type: type,
		obj: obj
	});
	this.features.push(feature);
}

MapLayer.prototype.deleteFeature = function(featureId) {
	for (i = this.features.length - 1; i >= 0; i--) {
		if (this.features[i].getId() === featureId) {
			var feature = this.features.splice(i, 1);

			$.map( feature, function( item, i ) {
				item.remove();
			});
			break
		}
	}
}

MapLayer.prototype.changeName = function(name) {
	this.name = name;
}

function MyMap(name, map) {
	this.userId = "";
	this.id 	= "";
	this.name	= name;
	this.layers = [];
	this.map 	= map;

	this.addLayer();
}

MyMap.prototype.addFeature = function(feature, type) {
	if (type === google.maps.drawing.OverlayType.POLYLINE && feature.isCompletePolyline()) {
		var poly = feature.toPolygon();
		feature.setMap(null);
		poly.setMap(this.map);
		feature = poly;
		type = google.maps.drawing.OverlayType.POLYGON;
	}

	if(this.selectedLayer) {
		this.selectedLayer.addFeature(feature, type);
	}
};

MyMap.prototype.getDefaultLayerName = function(obj) {
	return "Layer " + (this.layers.length + 1);	
};

MyMap.prototype.addLayer = function() {
	var layer = new MapLayer({
		id: "l" + this.layers.length,
		mapId: this.id,
		name: this.getDefaultLayerName()
	});
	this.layers.push(layer);
	this.selectedLayer = layer;
};

MyMap.prototype.deleteLayer = function(layerId) {
	for (var i = this.layers.length - 1; i >= 0; i--) {
		if (this.layers[i].getId() === layerId) {
			this.layers.splice(i, 1);
			break
		}
	}
};

MyMap.prototype.deleteFeature = function(layerId, featureId) {
	var layer = this.getLayer(layerId);
	layer.deleteFeature(featureId);
};

MyMap.prototype.getLayer = function(layerId) {
	for (var i = this.layers.length - 1; i >= 0; i--) {
		if (this.layers[i].getId() === layerId) {
			return this.layers[i];
		}
	}
}

MyMap.prototype.getLayers = function() {
	return this.layers;
}

MyMap.prototype.getLayerCount = function() {
	return this.layers.length;
}

MyMap.prototype.changeName = function(name) {
	this.name = name;
}