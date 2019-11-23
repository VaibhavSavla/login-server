const express = require('express');

const { User } = require('../models/user');

const profileApis = express.Router();

profileApis.get('/profile', (req, res) => {
  if (req.user) {
    const profile = User.findOne({ userId: req.user.userId });
    res.send(profile);
  } else {
    res.status(401).send();
  }
});

module.exports = profileApis;
