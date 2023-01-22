const express = require('express')
const router = express.Router()

// require campaign model
const Campaign = require('../models/campaign')
const { handle404 } = require('../lib/custom-errors')

// CREATE
// POST /notes/
router.post('/notes', (req, res, next) => {
	const campaignId = req.body.note.campaignId

	Campaign.findById(campaignId)
		.then(handle404)
		.then((campaign) => {
			campaign.notes.push(req.body.note)

			return campaign.save()
		})

		.then((campaign) => res.status(201).json({ campaign: campaign }))
		.catch(next)
})

// DESTROY
// DELETE /notes/:id
router.delete('/notes/:noteId', (req, res, next) => {
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

// UPDATE
// PATCH /notes/:id
router.patch('/notes/:noteId', (req, res, next) => {
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

module.exports = router
