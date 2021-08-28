const User = require('../models/User');
const Deck = require('../models/Deck');

const jwt = require('jsonwebtoken');
const encodedToken = (userID) => {
	return jwt.sign({
		iss: 'Ron Le',
		sub: userID,
		iat: new Date().getTime(),
		exp: new Date().setDate(new Date().getDate() + 3)
	}, process.env.JWT_SECRET)
}

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
			const newUser = new User(req.value.body);
			await newUser.save();
			return res.status(201).json(newUser);
		}catch(err){
			next(err);
		}		
	}
	// [GET] /user/:userID
	async getUser(req, res, next){
		try{
			const { userID } = req.value.params;
			const user = await User.findById(userID).exec();
			return res.status(200).json(user);
		}catch(err){
			next(err);
		}
	}
	// [PUT] /user/:userID
	async replaceUser(req, res, next){
		try{
			const { userID } = req.value.params;
			const newUser = req.value.body;
			const result = await User.findByIdAndUpdate(userID, newUser);
			return res.status(200).json({success: true});
		}catch(err){
			next(err);
		}
	}
	// [PATCH] /user/:userID
	async updateUser(req, res, next){
		try{
			const { userID } = req.value.params;
			const newUser = req.value.body;
			const result = await User.findByIdAndUpdate(userID, newUser);
			return res.status(200).json({success: true});
		}catch(err){
			next(err);
		}
	}

	// [GET] /user/:userID/decks
	async getUserDecks(req, res, next){
		try{
			const { userID } = req.value.params;
			// GET user
			const user = await User.findById(userID).populate('decks');

			return res.status(200).json(user);
		}catch(err){
			next(err);
		}
		
	}
	// [POST] /user/:userID/decks
	async createUserDecks(req, res, next){
		try{
			const { userID } = req.value.params;

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
		}catch(err){
			next(err);
		}
	}
	// [POST] /user/signup
	async signUp(req, res, next){
		try{
			const { firstName, lastName, email, password } = req.value.body;

			const foundUser = await User.findOne({email}).exec();
			if (foundUser == null){
				const newUser = new User({
					firstName,
					lastName,
					email, 
					password
				})
				await newUser.save();

				const token = encodedToken(newUser._id);
				res.setHeader('Authorization', token);
				return res.status(201).json({success: true});
			}else{
				return res.status(403).json({error: {
					message: 'Email has already existed'
				}})
			}
			
		}catch(err){
			next(err);
		}
		
	}
	// [POST] /user/signin
	async signIn(req, res, next){
		const token = encodedToken(req.user._id);
		res.setHeader('Authorization', token);
		return res.status(200).json({ success: true})
	}
	async secret(req, res, next){
		return res.status(200).json({ resouces: true });
	}
	// [GET] /user/auth/google
	async authGoogle(req, res, next){
		const token = encodedToken(req.user._id);
		res.setHeader('Authorization', token);
		return res.status(201).json({success: true})
	}
}

module.exports = new userController();