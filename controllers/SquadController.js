const Squad = require('../models/Squad');

class SquadController {
    create(user, club) {
        return new Promise((resolve, reject) => {
            new Squad({ user: user._id, club }).save()
                .then(squad => resolve(squad))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }

    update(exclude, user) {
        return new Promise((resolve, reject) => {
            Squad.findOne({ user: user._id }, 'club players _id')
                .then(squad => {
                    squad.players = squad.players.filter(player => {
                        let excludePlayer = exclude
                            .find(playerToExclude => String(playerToExclude) == String(player));
                        return excludePlayer ? false : true;
                    });
                    console.log(squad.players);
                    console.log(exclude);
                    return squad.save();
                })
                .then(squad => resolve(squad))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }

    getByUser(user) {
        return new Promise((resolve, reject) => {
            Squad.findOne({ user: user._id }, 'club players _id').populate('club players')
                .then(squad => resolve(squad))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
    getAll() {
        return new Promise((resolve, reject) => {
            Squad.find({}, 'club players _id').populate('club players')
                .then(squads => resolve(squads))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
}

module.exports = SquadController;