const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Tests =  require('./tests')


userTestSchema = new Schema({
	user_name: {
		type: String
	},

	user_des: {
		type: String
	},

	utest: {
		type: Array,
		// required: true
	}
}, {
	timestamps: true
});

const userTest = mongoose.model('userTest', userTestSchema);
module.exports = userTest;