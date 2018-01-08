const mongoose = require('mongoose');

const SquadSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    index: true
  }]
}, {
    versionKey: false
  });

SquadModel = mongoose.model('Squad', SquadSchema);


module.exports = SquadModel;