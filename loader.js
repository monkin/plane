

function loadX3D(fileName, callback) {
	$.ajax({
		 type: "GET",
		 url: fileName,
		 dataType: "xml",
		 success: function(nd) {
				var indexes = [];
				var points = [];
				//console.log($(nd, "Shape:first").length);
				$("Shape", nd).each(function() {
					shape = this;
					var indexInc = points.length;
					$.each($(shape).find("IndexedFaceSet").attr("coordIndex").split(", "), function() {
						if(this=="")
							return;
						var v = $.map(this.split(" "), function(v) {
								return parseInt(v) + indexInc;
							});
						v.pop();
						indexes.push(v);
					});
					$.each($(shape).find("Coordinate").attr("point").split(", "), function() {
						if(this!="")
							points.push($.map(this.split(" "), function(v) {
									return parseFloat(v);
								}));
					});
				});
				callback(createModel(points, indexes));
			}
		});
}