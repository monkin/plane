

function createModel(points, indexes) {
	var zShift = 600;
	var zIndexes = null;
	function zSort() {
		if(zIndexes)
			return;
		zIndexes = [];
		for(var i in indexes) {
			var p = indexes[i];
			zIndexes.push([p, points[p[0]][2] + points[p[1]][2] + points[p[2]][2]]);
		}
		zIndexes = zIndexes.sort(function(v1, v2) {
			if(v1[1]>v2[1])
				return 1;
			else if(v1[1]<v2[1])
				return -1;
			else
				return 0;
		});
	}
	var model = {
		translate: function(m) {
			var r = [];
			zIndexes = null;
			for(var i in points)
				r.push(m3d_mulv(m, points[i]));
			return createModel(r, indexes);
		},
		getTriangles: function() {
			zSort();
			function getProjection(p) {
				return [
					p[0]/(p[2]+zShift)*zShift,
					p[1]/(p[2]+zShift)*zShift
				];
			}
			var r = [];
			for(var i in zIndexes) {
				r.push([
					getProjection(points[zIndexes[i][0][0]]),
					getProjection(points[zIndexes[i][0][1]]),
					getProjection(points[zIndexes[i][0][2]])
				]);
			}
			return r;
		},
		pivotToCenter: function() {
			var v = [0, 0, 0];
			$.each(points, function() {
					v = v3d_add(v, this);
				});
			var scaleFactor = 1/points.length;
			v = v3d_scale(v, scaleFactor);
			return model.translate(m3d_move(-v[0], -v[1], -v[2]));
		}
	}
	return model;
}