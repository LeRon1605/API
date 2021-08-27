const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/User');
// Passport jwt
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
	secretOrKey: process.env.JWT_SECRET,
} , async (payload, done) => {
	try{
		const user = await User.findById(payload.sub);

		if (user == null) return done(null, false);

		done(null, user);
	}catch(err){
		done(err, false);
	}
}))

// Passport local
passport.use(new localStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try{
		const user = await User.findOne({email}).exec();

		if (!user) return done(null, false);

		const isCorrectPassword = await user.isValidPassword(password);

		if (isCorrectPassword) return done(null, user);
		else return done(null, false);
	}catch(err){

	}
}))
