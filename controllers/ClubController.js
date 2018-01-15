const Club = require('../models/Club');

class ClubController {
    getAll(query) {
        return new Promise((resolve, reject) => {
            Club.find(query)
                .then(clubs => resolve(clubs))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
}

module.exports = ClubController;