const Pack = require('../models/Pack');

class PackController {
    getAll(pack) {
        return new Promise((resolve, reject) => {
            Pack.findAll()
                .then(packs => resolve(packs))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
    open(constant) {
        return new Promise((resolve, reject) => {
            
        });
    }
}

module.exports = PackController;