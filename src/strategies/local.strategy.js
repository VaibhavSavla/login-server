const passport = require('passport');
const { Strategy } = require('passport-local');
const { Auth } = require('../models/auth');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    }, async (username, password, done) => {
      const user = await Auth.findOne({ username, password });
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    },
  ));
};
