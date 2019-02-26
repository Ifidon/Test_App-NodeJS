const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Questions = require('./questions')


const testSchema = new Schema({
	testquestions: {
		type: [Questions.questionSchema],
		required: true
	},

	testlength: {
		type: Number,
		required: true
	},

	testduration: {
		type: Number
	}
}, {
	timestamps: true
});


const Tests = mongoose.model('Test', testSchema);
module.exports = Tests