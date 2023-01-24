// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Character = require('../models/character')
const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /characters
router.get('/characters', requireToken, (req, res, next) => {
  Character.find()
		.then((characters) => {
			return characters.map((character) => character)
		})
		.then((characters) => res.status(200).json({ characters: characters }))
		.catch(next)
})

// SHOW
// GET /characters/5a7db6c74d55bc51bdf39793
router.get('/characters/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Character.findById(req.params.id)
		.then(handle404)
		.then((character) => res.status(200).json({ character: character }))
		.catch(next)
})

// CREATE
// POST /characters
router.post('/characters', requireToken, (req, res, next) => {

	Character.create(req.body.character)
		.then((character) => {
			res.status(201).json({ character: character })
		})
		.catch(next)
})

// UPDATE
// PATCH /characters/5a7db6c74d55bc51bdf39793
router.patch('/characters/:id', requireToken, (req, res, next) => {

	Character.findById(req.params.id)
        .then(handle404)
		.then((character) => {
			return character.updateOne(req.body.character)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /characters/5a7db6c74d55bc51bdf39793
router.delete('/characters/:id', requireToken, (req, res, next) => {
	Character.findById(req.params.id)
		.then(handle404)
		.then((character) => {
			character.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// exporting the router to use elsewhere
module.exports = router
