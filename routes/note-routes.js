const express = require('express')
const router = express.Router()

// require campaign model
const Campaign = require('../models/campaign')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

// CREATE
// POST /notes/
router.post('/notes', requireToken, (req, res, next) => {
	const campaignId = req.body.note.campaignId

    const note = req.body.note
    note.owner = req.user._id

	Campaign.findById(campaignId)
		.then(handle404)
		.then((campaign) => {
			campaign.notes.push(req.body.note)

			return campaign.save()
		})

		.then((campaign) => res.status(201).json({ campaign: campaign }))
		.catch(next)
})

// UPDATE
// PATCH /notes/:id
router.patch('/notes/:noteId', requireToken, (req, res, next) => {
	const campaignId = req.body.note.campaignId

	Campaign.findById(campaignId)
		.then(handle404)
		.then((campaign) => {
			const note = campaign.notes.id(req.params.noteId)
			note.set(req.body.note)
			return campaign.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /notes/:id
router.delete('/notes/:noteId', requireToken, (req, res, next) => {
	const campaignId = req.body.note.campaignId

	Campaign.findById(campaignId)
		.then(handle404)
		.then((campaign) => {
			campaign.notes.id(req.params.noteId).remove()

			return campaign.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
