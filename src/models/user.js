const mongoose = require('mongoose');

const User = mongoose.model('User', {
  userId: {
    type: String,
    required: [true, 'User Id is required'],
  },
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = {
  User,
};
