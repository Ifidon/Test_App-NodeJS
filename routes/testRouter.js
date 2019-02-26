var express = require('express');
var testRouter = express.Router();

const Tests = require('../models/tests')
const Questions = require('../models/questions')

// View, add, and update available tests

// view
testRouter.route('/')
.get((req, res, next) => {
	res.send('This page lists all available test in the TestDB')
})

// Add tests
testRouter.route('/create')
.get((req, res, next) => {
	res.send('This page displays the form(s) for creating/adding new tests to the TestDB')
})
.post((req, res, next) => {
	res.send('This is used to save new tests to the TestDB')
})

testRouter.route('/edit')
.get((req, res, next) => {
	res.send('This page displays the form(s) needed to update tests in the TestDB')
})
.post((req, res, next) => {
	res.send('This is used to save updates to tests in the TestDB')
})

// View, Add, and Update test questions

// View questions
testRouter.route('/questions')
.get((req, res, next) => {
	res.send('This page displays all questions available in the TestDB')
})

// Add questions
testRouter.route('/questions/create')
.get((req, res, next) => {
	res.send('This page displays the form(s) needed to add questions to the TestDB')
})
.post((req, res, next) => {
	res.send('This is used to save new questions to the TestDB')
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