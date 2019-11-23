const passport = require('passport');
const { Strategy } = require('passport-local');
const { Auth } = require('../models/auth');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    }, async (username, password, done) => {
      const { userId, expiry } = await Auth.findOne({ username, password }) || {};
      if (userId && (!expiry || expiry > Date.now())) {
        done(null, { userId });
      } else {
        done(null, false);
      }
    },
  ));
};
