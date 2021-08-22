const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String
	},
	decks: {
		type: Array,
		default: []
	}
})

module.exports = mongoose.model('User', User);