const express = require('express');
const passport = require('passport');
const uuid = require('uuid/v4');
const axios = require('axios');

const { Auth } = require('../models/auth');
const { User } = require('../models/user');
const { validateOtp, generateOtp } = require('../utils/utils');
const { SMS_API_KEY, OTP_NUM_DIGITS, OTP_EXPIRY } = require('../utils/env');

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
  const {
    email, password, method, firstName, lastName, mobile, otp,
  } = req.body;

  try {
    const validMethods = ['email', 'otp'];
    if (!validMethods.includes(method)) {
      res.status(400).send();
      return;
    }

    const alreadyExists = await User.findOne().or([{ email: email || 'N/A' }, { mobile: mobile || 'N/A' }]);
    if (alreadyExists) {
      res.status(400).send({ error: 'ERR_ALREADY_EXISTS', alreadyExists });
      return;
    }

    if (method === 'email') {
      if (!email || !password) { res.status(400).send(); return; }
      const auth = new Auth({ userId, username: email, password });
      await auth.save();
    }

    if (method === 'otp') {
      if (!mobile || !otp) { res.status(400).send(); return; }
      const isValid = await validateOtp(mobile, otp);
      if (!isValid) {
        res.status(401).send();
        return;
      }

      await Auth.findOneAndUpdate({ username: mobile }, { userId });
    }

    const user = new User({
      userId, firstName, lastName, email, mobile,
    });
    await user.save();
    req.login({ userId }, () => {
      res.status(200).send();
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

authApis.get('/sendOtp/:mobile', async (req, res) => {
  const { mobile } = req.params;
  try {
    const otp = generateOtp(OTP_NUM_DIGITS);
    const auth = { username: mobile, password: otp, expiry: Date.now() + Number(OTP_EXPIRY) };
    await Auth.findOneAndUpdate({ username: mobile }, auth);
    const smsUrl = `http://2factor.in/API/V1/${SMS_API_KEY}/SMS/${mobile}/${otp}`;
    await axios.get(smsUrl);
    res.send();
  } catch (err) {
    res.status(err.status || 500).send(err);
  }
});

module.exports = authApis;
