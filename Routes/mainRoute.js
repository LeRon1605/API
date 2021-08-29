const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
router.get('/', (req, res, next) => {
	res.stautus(200).sendFile('/public/index.html')
})
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile', 'openid' ] }
));
router.get('/auth/facebook', 
  passport.authenticate('facebook'), (req, res, next) => res.status(200));
module.exports = router;