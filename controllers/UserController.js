const Credential = require('../models/Credential');
const User = require('../models/User');
const md5 = require('md5');

class UserController {
    signUp(name, login, password) {
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

    auth(login, password) {
        return new Promise((resolve, reject) => {
            User.findOne({}).populate({
                path: 'credentials',
                match: {
                    login,
                    password: md5(password)
                }
            })
                .then(user => {
                    if (!user)
                        reject({ status: 401, msg: 'INVALID_CREDENTIALS' });

                    resolve({
                        name: user.name,
                        score: user.score,
                        wins: user.wins,
                        losses: user.losses,
                        draws: user.draws,
                        coins: user.coins
                    });
                })
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
}

module.exports = UserController;