const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
router.get('/', (req, res, next) => {
	res.sendFile('/public/index.html')
})
router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile', 'openid' ] }
));
module.exports = router;