const User = require('../models/User');
const Deck = require('../models/Deck');

class deckController{
	async index(req, res, next){
		try{
			const decks = await Deck.find({}).exec();
			return res.status(200).json(decks);
		}catch(err){
			next(err);
		}
	}
	async createNewDeck(req, res, next){
		try{
			const owner = await User.findById(req.value.body.owner);

			const newDeck = new Deck({
				...req.body,
				owner: owner._id
			})

			await newDeck.save();
			owner.decks.push(newDeck._id);
			await owner.save();
			return res.status(201).json(newDeck);
		}catch(err){
			next(err);
		}
	}
	// [GET] /deck/:deckID
	async getDeck(req, res, next){
		try{
			const { deckID } = req.value.params;
			const deck = await Deck.findById(deckID).exec();
			return res.status(200).json(deck);
		}catch(err){
			next(err);
		}
	}
	// [PUT] /deck/:deckID
	async replaceDeck(req, res, next){
		try{
			const { deckID } = req.value.params;
			const newDeck = req.value.body;
			const deck = await Deck.findByIdAndUpdate(deckID, newDeck);
			return res.status(200).json(deck);
		}catch(err){
			next(err)
		}
	}
	// [PATCH] /deck/:deckID
	async updateDeck(req, res, next){
		try{
			const { deckID } = req.value.params;
			const newDeck = req.value.body;
			const deck = await Deck.findByIdAndUpdate(deckID, newDeck);
			return res.status(200).json(deck);
		}catch(err){
			next(err)
		}
	}
	// [DELETE] /deck/:deckID
	async deleteDeck(req, res, next){
		try{
			const { deckID } = req.value.params;
			const deck = await Deck.findById(deckID).exec();
			const owner = await User.findById(deck.owner).exec();
			
			owner.decks.splice(owner.decks.indexOf(deck), 1);
			await owner.save();
			await Deck.deleteOne(deck);
			return res.status(202).json({success: true}) 
		}catch(err){
			next(err)
		}
	}
}

module.exports = new deckController();