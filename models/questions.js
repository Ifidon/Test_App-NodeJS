const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	question: {
		type: String,
		required: true
	},

	option: {
		type: Array,
		minlength: 2,
		required: true
	},

	answer: {
		type: Array,
		minlength: 1,
		required: true
	}
});

const Questions = mongoose.model('Question', questionSchema);
module.exports = Questions