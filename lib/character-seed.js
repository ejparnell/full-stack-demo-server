const express = require('express')

const Character = require('../models/character')

const router = express.Router()

const startCharacters = [
	{
		firstName: 'Sam',
		lastName: 'Gamgee',
		class: 'fighter',
		strength: 9,
	},
	{
		firstName: 'Gandalf',
		lastName: 'The White',
		class: 'Wizard',
		strength: 8,
	},
	{
		firstName: 'Aragorn',
		lastName: 'Strider',
		class: 'rogue',
		strength: 12,
	},
]

router.get('/characters', (req, res, next) => {
	Character.deleteMany({})
        .then(() => {
            Character.create(startCharacters)
                .then((characters) => res.status(200).json({ characters: characters }))
        })
        .catch(next)
})

module.exports = router