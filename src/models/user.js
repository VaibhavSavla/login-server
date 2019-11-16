const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: [true, 'Email Id is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is requierd'],
  },
});

module.exports = {
  User,
};
