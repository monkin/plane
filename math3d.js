
function v3d(x, y, z) {
	return [x, y, z];
}

function v3d_muls(v1, v2) {
	return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
}

function v3d_mulv(v1, v2) {
	return [
		v1[1]*v2[2] - v1[2]*v2[1],
		v1[2]*v2[0] - v1[0]*v2[2],
		v1[0]*v2[1] - v1[1]*v2[0]
	];
}

function v3d_length(v) {
	return Math.sqrt(v3d_muls(v, v));
}

function v3d_scale(v, sf) {
	return [v[0]*sf, v[1]*sf, v[2]*sf];
}

function v3d_add(v1, v2) {
	return [v1[0] + v2[0],
		v1[1] + v2[1],
		v1[2] + v2[2]];
}

function v3d_sub(v1, v2) {
	return [v1[0] - v2[0],
		v1[1] - v2[1],
		v1[2] - v2[2]];
}

function v3d_normalize(v, len) {
	var l = v3d_length(v);
	if(l!=0)
		return v3d_scale(v, len/l);
	else
		return [0, 0, 0];
}

function m3d_mulv(m, v) {
	return [
		v3d_muls(m[0], v) + m[0][3],
		v3d_muls(m[1], v) + m[1][3],
		v3d_muls(m[2], v) + m[2][3],
	];
}

function m3d_col(m, i) {
	return [m[0][i], m[1][i], m[2][i], m[3][i]]
}

function m3d_mulm(m0, m1) {
	function mv4(v1, v2) {
		return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2] + v1[3]*v2[3];
	}
	var r = [[], [], [], []];
	for(var i=0; i<3; i++) {
		for(var j=0; j<4; j++)
			r[i][j] = mv4(m0[i], m3d_col(m1, j));
	}
	r[3] = [0, 0, 0, 1];
	return r;
}

function m3d_identity() {
	return [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]];
}

function m3d_move(dx, dy, dz) {
	return [
		[1, 0, 0, dx],
		[0, 1, 0, dy],
		[0, 0, 1, dz],
		[0, 0, 0, 1]
	];
}


function m3d_scale(mx, my, mz) {
	return [
		[mx, 0, 0, 0],
		[0, my, 0, 0],
		[0, 0, mz, 0],
		[0, 0, 0,  1]];
}


function m3d_rotate(axis, a) {
	var sin_a = Math.sin(a);
	var cos_a = Math.cos(a);
	switch(axis) {
		case 0:
			return [
				[1, 0, 0, 0],
				[0, cos_a, sin_a, 0],
				[0, -sin_a, cos_a, 0],
				[0, 0, 0, 1]];
		case 1:
			return [
				[cos_a, 0, -sin_a, 0],
				[0, 1, 0, 0],
				[sin_a, 0, cos_a, 0],
				[0, 0, 0, 1]];
		case 2:
			return [
				[cos_a, sin_a, 0, 0],
				[-sin_a, cos_a, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]];
	}
	throw new Error("Invalid axis.");
}


