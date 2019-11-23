/* eslint-disable import/prefer-default-export */
const { Auth } = require('../models/auth');

const generateOtp = (numDigits = 4) => {
  const power = 10 ** (numDigits - 1);
  return Math.floor(Math.random() * 9 * power) + power;
};

const validateOtp = async (username, password) => {
  const auth = await Auth.findOne({ username, password });
  return auth && (!auth.expiry || auth.expiry > Date.now());
};

module.exports = {
  validateOtp,
  generateOtp,
};
