module.exports = {
	get_random: function (grp, size) {
	test = [];
	while (test.length < size) {
		len = grp.length;
		ind = Math.floor(Math.random() * len);
		if (test.includes(grp[ind])) {
			continue;
		}
		else {
			test.push(grp[ind]);

		}
	}

	return test;
	},

	random_question: function (grp) {
		if(grp.length > 1) {
			ind = Math.floor(Math.random() * grp.length)
			grp.splice(ind, 1)
			return ind
		}
		else {
			return 0
		}
	}

}