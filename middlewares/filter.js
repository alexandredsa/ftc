const Credential = require('../models/Credential');

module.exports = function (req, res, next) {
    const token = req.headers['app-token'];

    if (!token) {
        res.json({ status: 403, msg: "INVALID_TOKEN" });
        return;
    }

    isTokenValid(token)
        .then(() => next())
        .catch(err => res.json(err));
};

isTokenValid: (headerToken) => {
    return new Promise((resolve, reject) => {
        Credential.findOne({
            token: headerToken
        })
            .then(credential => {
                if (!credential)
                    reject({ status: 403, msg: "INVALID_TOKEN" });
                resolve();
            })
            .catch(err => reject({ status: 500, msg: err }));
    });
}