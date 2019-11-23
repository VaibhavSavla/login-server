const express = require('express');
const passport = require('passport');
const uuid = require('uuid/v4');

const { Auth } = require('../models/auth');
const { User } = require('../models/user');

const authApis = express.Router();

authApis.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send();
});

authApis.get('/logout', (req, res) => {
  req.logOut();
  res.send();
});

authApis.post('/register', async (req, res) => {
  const userId = uuid();

  const auth = new Auth({
    userId,
    username: req.body.username,
    password: req.body.password,
  });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
  });

  try {
    await auth.save();
    await user.save();
    req.login(req.body, () => {
      res.status(200).send();
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

authApis.get('/sendOtp/:mobile', async (req, res) => {
  const { mobile } = req.params;
});

module.exports = authApis;
