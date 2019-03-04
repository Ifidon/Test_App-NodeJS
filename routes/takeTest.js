var express = require('express');
var router = express.Router();

const Tests = require('../models/tests')
const Questions = require('../models/questions');
const userTests = require('../models/usertest')

const codes = require('../jsscript')

error = {'status': 400}

// Take Tests

router.route('/')
.get((req, res, next) => {
	userTests.find()
	// .populate('utest')
	.then((usertest) => {
		res.send(usertest)
	})
})

// router.route('/:test_id')
// .get((req, res, next) => {
// 	Tests.findOne({_id: req.params.test_id}, {_id: 1})
// 	.populate({path:'testquestions', select: ['question', 'option']})
// 	.then((test) => {
// 		res.send(test)
// 	})
// 	.catch((e) => {
// 		error.message = e.message
// 		res.render('error', error)
// 	})
// })

// .post((req, res, next) => {

// })




module.exports = router;

