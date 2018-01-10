const Match = require('../models/Match');

class MatchController {
    create(name, login, password) {
        return new Promise((resolve, reject) => {
            new Credential({ login, password: md5(password) })
                .save()
                .then(credential => {
                    let user = new User({ credentials: credential, name });
                    return user.save();
                })
                .then(user => resolve(user))
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
    
}

module.exports = MatchController;