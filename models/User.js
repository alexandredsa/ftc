const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  score: {
    type: Number
  },
  wins: {
    type: Number
  },
  draws: {
    type: Number
  },
  losses: {
    type: Number
  },
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
    index: true
  }],
  coins: {
    type: Number
  },
  credentials: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Credential',
    required: true,
    index: true
  }
}, {
    versionKey: false
  });

UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;