const mongoose = require('mongoose');


const ScoreSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  score: {
    type: Number,
    required: true,
    index: true
  }
}, {
  versionKey: false
});


const MatchSchema = new mongoose.Schema({
  ScoreHome: ScoreSchema,
  ScoreAway: ScoreSchema,
  at: {
    type: Date
  }
}, {
  versionKey: false
});

MatchModel = mongoose.model('Match', MatchSchema);


module.exports = MatchModel;