const express = require('express');
const router = express.Router();

const deckController = require('../controllers/deck');
const { validateParams, validateBody, schemas } = require('../helpers/routerHelpers');
router
	.get('/', deckController.index)
	.post('/', validateBody(schemas.newDeckSchema), deckController.createNewDeck)
router
	.get('/:deckID', validateParams(schemas.idSchema, 'deckID'), deckController.getDeck)
	.put('/:deckID', validateParams(schemas.idSchema, 'deckID'), validateBody(schemas.deckSchema) ,deckController.replaceDeck)
	.patch('/:deckID', validateParams(schemas.idSchema, 'deckID'), validateBody(schemas.deckOptionalSchema) ,deckController.updateDeck)
	.delete('/:deckID', validateParams(schemas.idSchema, 'deckID'), deckController.deleteDeck)
module.exports = router; 