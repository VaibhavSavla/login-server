const express = require('express');
const authApis = require('./auth');
const profileApis = require('./profile');

const apisV1 = express.Router();

apisV1.use('/auth', authApis);
apisV1.use('/profile', profileApis);

module.exports = apisV1;
