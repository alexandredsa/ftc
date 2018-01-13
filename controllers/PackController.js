const Pack = require('../models/Pack');

class PackController {
    getAll(pack) {
        return new Promise((resolve, reject) => {
            Pack.find()
                .then(packs => resolve(packs))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
    open(id) {
        return new Promise((resolve, reject) => {
            Pack.open(id)
                .then(players => resolve(players))
                .catch(err => reject(err))
        });
    }
}

module.exports = PackController;