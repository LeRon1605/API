const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
router
	.get('/', userController.index)
	.post('/', userController.createUser)
router
	.get('/:userID', userController.getUser)
	.put('/:userID', userController.replaceUser)
	.patch('/:userID', userController.updateUser)
router
	.get('/:userID/decks', userController.getUserDecks)
	.post('/:userID/decks', userController.createUserDecks)
module.exports = router;