const mongoose = require('mongoose');

const Auth = mongoose.model('Auth', {
  userId: String,
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is requierd'],
  },
  expiry: Number,
});

module.exports = {
  Auth,
};
