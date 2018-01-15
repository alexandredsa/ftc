const Credential = require('../models/Credential');
const User = require('../models/User');

module.exports = function (req, res, next) {
    const token = req.headers['app-token'];

    if (!token) {
        res.json({ status: 403, msg: "INVALID_TOKEN" });
        return;
    }

    isTokenValid(token)
        .then(user => {
            req.session = { user };
            return next();
        })
        .catch(err => res.json(err));
};

function isTokenValid(headerToken) {
    return new Promise((resolve, reject) => {
        Credential.findOne({
            token: headerToken
        })
            .then(credential => {
                if (!credential)
                    reject({ status: 403, msg: "INVALID_TOKEN" });
                return User.findOne({ credentials: credential._id })
            })
            .then(user => resolve(user))
            .catch(err => reject({ status: 500, msg: err }));
    });
}