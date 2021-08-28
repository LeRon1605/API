const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const User = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String, 
	},
	authGoogleID: {
		type: String,
		default: null
	},
	authFacebookID: {
		type: String,
		default: null
	},
	authType: {
		type: String,
		enum: ['local', 'google', 'facebook'],
		default: 'local'
	},
	decks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Deck'
		}
	]
})

User.pre('save', async function (next){
	try{
		if (this.authType != 'local') next();
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(this.password, salt);
		this.password = hash;
		next();
	}catch(err){
		next(err);
	}
})

User.methods.isValidPassword = async function(userPassword){
	try{
		return await bcrypt.compare(userPassword, this.password);
	}catch(err){
		throw new Error(err);
	}
}

module.exports = mongoose.model('User', User);