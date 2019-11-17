const express = require('express');
const passport = require('passport');

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
  const user = new User(req.body);

  try {
    await user.save();
    req.login(req.body, () => {
      res.status(200).send();
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

authApis.get('/profile', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send();
  }
});

module.exports = authApis;
