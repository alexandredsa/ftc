const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String
  },
  password: {
    type: String
  }
}, {
    versionKey: false
  });

UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;