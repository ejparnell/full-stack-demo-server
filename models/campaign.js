// require mongoose
const mongoose = require('mongoose')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new campaign Schema
const campaignSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
)

// Creating a Mongoose Model called Campaign
// Collection will be called campaigns
const Campaign = mongoose.model('Campaign', campaignSchema)

// Exporting Campaign model to use elsewhere
module.exports = Campaign
