const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const { validateParams, validateBody, schemas } = require('../helpers/routerHelpers');
router
	.get('/', userController.index)
	.post('/', validateBody(schemas.userSchema), userController.createUser)
router
	.post('/signup', validateBody(schemas.userSignUpSchema), userController.signUp)
router
	.post('/signin', validateBody(schemas.userSignInSchema), userController.signIn)

router
	.get('/:userID', validateParams(schemas.idSchema, 'userID'), userController.getUser)
	.put('/:userID', validateParams(schemas.idSchema, 'userID'), validateBody(schemas.userSchema),  userController.replaceUser)
	.patch('/:userID', validateParams(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), userController.updateUser)
router
	.get('/:userID/decks', validateParams(schemas.idSchema, 'userID'), userController.getUserDecks)
	.post('/:userID/decks', validateParams(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), userController.createUserDecks)
module.exports = router;