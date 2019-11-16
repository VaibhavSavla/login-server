const express = require('express');
const authApis = require('./auth');

const apisV1 = express.Router();

apisV1.use('/auth', authApis);

module.exports = apisV1;
