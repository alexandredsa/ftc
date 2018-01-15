const mongoose = require('mongoose');
const Squad = require('./Squad');
const Player = require('./Player');
const _ = require('underscore');

const DefinitionSchema = new mongoose.Schema({
  qty: {
    type: Number
  },
  minRating: {
    type: Number
  },
  maxRating: {
    type: Number
  }
}, {
    versionKey: false,
    _id: false
  });

const PackSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  logo_url: {
    type: String
  },
  definitions: [DefinitionSchema]
}, {
    versionKey: false
  });


PackModel = mongoose.model('Pack', PackSchema);



PackModel.sortPack = (minRating, maxRating, qty) => {
  return new Promise((resolve, reject) => {
    Squad.find()
      .then(squads => {
        const ids = [];

        squads.forEach(squad => {
          squad.players.forEach(player => ids.push(player._id));
        });

        return Player
          .aggregate({ $match: { rating: { $gte: minRating, $lt: maxRating }, _id: { $nin: ids } } })
          .sample(qty);
      })
      .then(players => resolve(players))
      .catch(err => reject(err));
  });
}

PackModel.open = (id) => {
  return new Promise((resolve, reject) => {
    PackModel.findById(id)
      .then(pack => {
        const promises = [];
        pack.definitions.forEach(definition => {
          promises.push(PackModel.sortPack(definition.minRating, definition.maxRating, definition.qty));
        });

        return Promise.all(promises)
      })
      .then(result => resolve(_.flatten(result)))
      .catch(err => reject(err));
  });
};

module.exports = PackModel;