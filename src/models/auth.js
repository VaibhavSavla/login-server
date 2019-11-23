const mongoose = require('mongoose');

const Auth = mongoose.model('AuthEmail', {
  userId: {
    type: String,
    required: [true, 'User Id is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is requierd'],
  },
});

module.exports = {
  Auth,
};
