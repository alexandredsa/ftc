const importer = require('./importer');
const users = require('./users');

module.exports = (app) => {
    app.get('health', (req, res, next) => {
        res.json(200, { status: 'tá suave'});
        next();
    });

    app.get('importer', importer);

    app.post('users/signup', users.signUp);
    app.post('users/auth', users.auth);
    
};