const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  photo_url: {
    type: String
  },
  position: {
    type: String
  },
  rating: {
    type: Number
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
    index: true
  },
  nationality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nationality',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['Não Listado', 'Para Transfêrencia'],
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  }
}, {
  versionKey: false
});

PlayerModel = mongoose.model('Player', PlayerSchema);

module.exports = PlayerModel;