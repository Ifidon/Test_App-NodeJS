var express = require('express');
var router = express.Router();

const Tests = require('../models/tests')
const Questions = require('../models/questions');
const userTests = require('../models/usertest')

const codes = require('../jsscript')

error = {'status': 400}

// Get user

router.route('/')
.get((req, res, next) => {
	res.render('getuser')	
})

.post((req, res, next) => {
	// tests = Tests.find()
	userTests.create(req.body)
	.then((user) => {
		Tests.find()
		.then((tests, err) => {
			if(err) {
				error.message = err.message
				res.render('error', error)
			}
			else {
				res.render('usertest', {user, tests})
			}
			
			// console.log(tests)
		})
	})
	.catch((e) => {
		error.message = e.message
		res.render('error', error)
	})
})


router.route('/:user_id/:test_id')
.get((req, res, next) => {
	userTests.findOne({_id: req.params.user_id})
	.then((user) => {
		Tests.findOne({_id: req.params.test_id})
		.populate('testquestions')
		.then((test) => {
			res.render('teststartpage', {user, test})
			// res.send(test)
		})
		return null
	})
	.catch((e) => {
		error.message = e.message
		res.render('error', error)
	})
})

.post((req, res, next) => {
	this_test = []
	Tests.findOne({_id: req.params.test_id})
	.populate('testquestions')
	.then((test) => {
		for (index=0; index<test.testquestions.length; index++) {
			this_test.push({_id: test.testquestions[index]._id, question: test.testquestions[index].question, options: test.testquestions[index].option, submission: ' ' })
		}
		userTests.findOne({_id: req.params.user_id})
		.then((user) => {
			console.log(this_test)
			user.utest.push(this_test)
			user.save()
			test_ind = user.utest.length - 1;
			the_test = user.utest[test_ind]
			num = 0
			seq = codes.random_number(the_test.length)
			console.log(seq)
			// res.send(the_test)
			res.render('qpage', {user, the_test, seq, num})
		})

	})
	.catch((e) => {
		error.message = e.message;
		res.render('error', error)
	})
	// userTests.findOne({_id: req.params.user_id})
	// .then((user) => {
	// 	// user.utest.push(this_test)
	// 	// user.save()
	// 	// test = this_test
	// 	// ind = Math.floor(Math.random() * test.length)
	// 	// console.log(ind)
	// 	res.send(user.utest[7])
	// })
})


// Take Tests

// router.route('/')
// .get((req, res, next) => {
// 	userTests.find()
// 	// .populate('utest')
// 	.then((usertest) => {
// 		res.send(usertest)
// 	})
// })

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

