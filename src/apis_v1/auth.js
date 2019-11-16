const express = require('express');

const authApis = express.Router();

authApis.post('/register', (req, res) => {
  req.login(req.body, () => {
    res.status(200).send();
  });
});

authApis.get('/profile', (req, res) => {
  res.send(req.user);
});

module.exports = authApis;
