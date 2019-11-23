const express = require('express');
const { promisify } = require('util');
const redis = require('redis');
const { User } = require('../models/user');

const redisClient = redis.createClient();
const getRedisAsync = promisify(redisClient.get).bind(redisClient);

const profileApis = express.Router();

profileApis.get('/', async (req, res) => {
  if (req.user) {
    let profile = await getRedisAsync(req.user.userId);
    if (profile) {
      profile = JSON.parse(profile);
    } else {
      profile = await User.findOne({ userId: req.user.userId }, { _id: 0, __v: 0 }).lean();
      redisClient.set(req.user.userId, JSON.stringify(profile));
    }
    res.send(profile);
  } else {
    res.status(401).send();
  }
});

module.exports = profileApis;
