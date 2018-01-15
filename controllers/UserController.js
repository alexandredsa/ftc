const Credential = require('../models/Credential');
const User = require('../models/User');
const md5 = require('md5');
const hat = require('hat');

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
            Credential.findOne({
                login,
                password: md5(password)
            })
                .then(credential => {
                    if (!credential)
                        reject({ status: 401, msg: 'INVALID_CREDENTIALS' });

                    return User.findOne({ credentials: credential._id });
                })
                .then(user => {
                    this._user = user;
                    return Credential.findOneAndUpdate({ login }, { token: hat() });
                })
                .then(() => {
                    resolve({
                        name: this._user.name,
                        score: this._user.score,
                        wins: this._user.wins,
                        losses: this._user.losses,
                        draws: this._user.draws,
                        coins: this._user.coins
                    });
                })
                .catch(err => reject({ status: 500, msg: err }));
        });
    }
}

module.exports = UserController;