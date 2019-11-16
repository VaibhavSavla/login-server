const passport = require('passport');
const { Strategy } = require('passport-local');
const { User } = require('../models/user');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    }, async (email, password, done) => {
      const user = { email, password };
      const isValid = await User.exists(user);
      if (isValid) {
        done(null, user);
      } else {
        done(null, false);
      }
    },
  ));
};
