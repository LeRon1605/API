const Joi = require('joi');
const schemas = {
	idSchema: Joi.object().keys({
		param: Joi.string().max(24).required()
	}),
	userSchema: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required()
	}),
	userOptionalSchema: Joi.object().keys({
		firstName: Joi.string(),
		lastName: Joi.string(),
		email: Joi.string().email()
	}),
	deckSchema: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required()
	})
}

const validateParams = (schema, name) => {
	return (req, res, next) => {
		const validatorResult = schema.validate({ param: req.params[name]})

		if (validatorResult.error){
			return res.status(400).json(validatorResult.error);
		}else{
			if (!req.value) req.value = {};
			if (!req.value.params) req.value.params = {};
			req.value.params[name] = req.params[name];
			next();
		}
	}
}

const validateBody = (schema) => {
	return (req, res, next) => {
		const validatorResult = schema.validate(req.body);
		if (validatorResult.error){
			return res.status(400).json(validatorResult.error);
		}else{
			if (!req.value) req.value = {};
			if (!req.value.body) req.value.body = {};
			req.value.body = req.body;
			next();
		}
	}
}
module.exports = {
	validateParams,
	validateBody,
	schemas
}