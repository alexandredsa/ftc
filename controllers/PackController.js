const Pack = require('../models/Pack');
const Squad = require('../models/Squad');

class PackController {
    getAll() {
        return new Promise((resolve, reject) => {
            Pack.find()
                .then(packs => resolve(packs))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
    open(id, user) {
        return new Promise((resolve, reject) => {
            Pack.open(id)
                .then(players => {
                    this._players = players;
                    return Squad.update({ user: user._id }, {
                        $push:
                        { 'players': { $each: this._players } }
                    }, { upsert: true });
                })
                .then(result => Squad.findOne({ user: user._id }, 'players club _id').populate('players club'))
                .then(squad => resolve({ squad, players: this._players }))
                .catch(err => reject(err))
        });
    }
}

module.exports = PackController;