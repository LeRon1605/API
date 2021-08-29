const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require('passport-facebook');
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

// Passport Google Plus Token
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/user/auth/google",
    passReqToCallback : true
}, async (req, accessToken, refreshToken, profile, done) => {
	// Check whether this user is exist in db or not
	const isExistUser = await User.findOne({
		authGoogleID: profile.id,
		authType: 'google'
	})

	if (isExistUser) return done(null, isExistUser);
	else{
		const newUser = new User({
			authType: 'google',
			email: profile.emails[0].value,
			authGoogleID: profile.id,
			password: '12345678'
		})
		await newUser.save();
		return done(null, newUser);
	}
}))
// Passport Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/user/auth/facebook',
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try{
		const isExistUser = await User.findOne({
			authType: 'facebook',
			authFacebookID: profile.id,
			email: profile.emails[0].value
		});
		if (isExistUser) return done(null, isExistUser);
		else{
			const newUser = new User({
				authType: 'facebook',
				authFacebookID: profile.id,
				email: profile.emails[0].value,
				password: '334566666'
			});
			await newUser.save();
			return done(null, newUser);
		}
	}catch(err){
		done(err);
	}
  }
));
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
