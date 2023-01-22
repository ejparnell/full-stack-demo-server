// require mongoose
const mongoose = require('mongoose')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new character Schema
const characterSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		class: {
			type: String,
			required: true,
		},
		strength: {
			type: Number,
			required: true,
			min: 1,
			max: 30,
		},
	},
	{
		timestamps: true,
	}
)

// Creating a Mongoose Model called Character
// Collection will be called characters
const Character = mongoose.model('Character', characterSchema)

// Exporting Character model to use elsewhere
module.exports = Character
