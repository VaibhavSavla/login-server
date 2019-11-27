const express = require('express');
const { promisify } = require('util');
const redis = require('redis');
const { User } = require('../models/user');
const { logError } = require('../utils/logger');

let redisClient;
let getRedisAsync;
try {
  redisClient = redis.createClient();
  getRedisAsync = promisify(redisClient.get).bind(redisClient);
} catch (err) {
  logError(err);
}

const profileApis = express.Router();

profileApis.get('/', async (req, res) => {
  if (req.user) {
    let profile;
    try {
      profile = await getRedisAsync(req.user.userId);
    } catch (err) {
      logError(err);
    }
    if (profile) {
      profile = JSON.parse(profile);
    } else {
      profile = await User.findOne({ userId: req.user.userId }, { _id: 0, __v: 0 }).lean();
      try {
        redisClient.set(req.user.userId, JSON.stringify(profile));
      } catch (err) {
        logError(err);
      }
    }
    res.send(profile);
  } else {
    res.status(401).send();
  }
});

module.exports = profileApis;
