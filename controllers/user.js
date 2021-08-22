const User = require('../models/User');
const Deck = require('../models/Deck');
class userController{
	// [GET] /user
	async index(req, res, next){
		try{
			const users = await User.find({}).exec();
			return res.status(200).json(users);
		}catch(err){
			next(err);
		}
	}
	// [POST] /user
	async createUser(req, res, next){
		try{
			const newUser = new User(req.body);
			await newUser.save();
			return res.status(201).json(newUser);
		}catch(err){
			next(err);
		}		
	}
	// [GET] /user/:userID
	async getUser(req, res, next){
		try{
			const { userID } = req.params;
			const user = await User.findById(userID).exec();
			return res.status(200).json(user);
		}catch(err){
			next(err);
		}
	}
	// [PUT] /user/:userID
	async replaceUser(req, res, next){
		try{
			const { userID } = req.params;
			const newUser = req.body;
			const result = await User.findByIdAndUpdate(userID, newUser);
			return res.status(200).json({success: true});
		}catch(err){
			next(err);
		}
	}
	// [PATCH] /user/:userID
	async updateUser(req, res, next){
		try{
			const { userID } = req.params;
			const newUser = req.body;
			const result = await User.findByIdAndUpdate(userID, newUser);
			return res.status(200).json({success: true});
		}catch(err){
			next(err);
		}
	}

	// [GET] /user/:userID/decks
	async getUserDecks(req, res, next){
		const { userID } = req.params;
		
	}
	// [POST] /user/:userID/decks
	async createUserDecks(req, res, next){
		const { userID } = req.params;

		// Get user
		const user = await User.findById(userID).exec();

		// Create new deck
		const newDeck = new Deck(req.body);

		// Assign onwer
		newDeck.owner = user;
		await newDeck.save();

		user.decks.push(newDeck._id);
		await user.save();

		return res.status(201).json(newDeck);
	}
}

module.exports = new userController();