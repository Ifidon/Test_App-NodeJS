var express = require('express');
var testRouter = express.Router();

// var mongoose = require('mongoose')

const Tests = require('../models/tests')
const Questions = require('../models/questions')
const userTests = require('../models/usertest')
const codes = require('../jsscript')
// const pycodes = require('../pycodes.py')

error = {'status': 400}

// View, add, and update available tests

// view
testRouter.route('/')
.get((req, res, next) => {
	Tests.find()
	.then((tests) => {
		res.send(tests)
	})
	.catch((e) => {
		// error = {}
		// error.status = 400
		error.message = e.message
		console.log(e)
		res.render('error', error)
	})
	// res.send('This page lists all available test in the TestDB')
})

// Add tests
testRouter.route('/create')
.get((req, res, next) => {
	res.render('new_test')
	// res.send('This page displays the form(s) for creating/adding new tests to the TestDB')
})
.post((req, res, next) => {
	Questions.find({}, {_id: 1})
	.then((questions) => {
		req.body['testquestions'] = codes.get_random(questions, req.body.testlength)
		Tests.create(req.body)
		res.send(req.body)
	})
	.catch((e) => {
		error.message = e.message
		res.render('error', error)
	})
	// res.send('This is used to save new tests to the TestDB')
})

testRouter.route('/edit')
.get((req, res, next) => {
	res.send('This page displays the form(s) needed to update tests in the TestDB')
})
.post((req, res, next) => {
	res.send('This is used to save updates to tests in the TestDB')
})


// Take Tests

testRouter.route('/:test_id')
.get((req, res, next) => {
	Tests.findOne({_id: req.params.test_id}, {_id: 1})
	.populate('testquestions')
	.then((test) => {
		userTests.create({utest: test.testquestions})
		res.send(test)
	})
	.catch((e) => {
		error.message = e.message
		res.render('error', error)
	})
})

.post((req, res, next) => {

})

// testRouter.route('/:test_id/update')
// .get((req, res, next) => {
// 	my_test = []
// 	Tests.findOne({_id: req.params.test_id}, {_id: 1, testquestions: 1} )
// 	Questions.findOne({_id: q_id}, {question:1, option:1})
// })



// View, Add, and Update test questions

// View questions
testRouter.route('/questions')
.get((req, res, next) => {
	Questions.find()
	.then((questions) => {
		res.send(questions)
	})
	.catch((e) => {
		error.message = e.message
		res.render('error', error)
	})
	// res.send('This page displays all questions available in the TestDB')
})

// Add questions
testRouter.route('/questions/create')
.get((req, res, next) => {
	res.render('new_question')
	// res.send('This page displays the form(s) needed to add questions to the TestDB')
})
.post((req, res, next) => {
	console.log(req.body)
	Questions.create(req.body)
	.then((question) => {
		res.send(question)
	})
	.catch((e) => {
		error.message = e.message
		res.render('error', error)
	})
	// res.send('This is used to save new questions to the TestDB')
})

// Edit questions
testRouter.route('/questions/edit')
.get((req, res, next) => {
	res.send('This page displays the form(s) needed to update questions already in the TestDB')
})
.post((req, res, next) => {
	res.send('This is used to save updates to questions in the TestDB')
})


module.exports = testRouter;