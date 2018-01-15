const importer = require('./importer');
const users = require('./users');
const packs = require('./packs');
const clubs = require('./clubs');
const filter = require('../middlewares/filter');
const squads = require('./squads');

module.exports = (app) => {
    app.get('health', (req, res, next) => {
        res.json(200, { status: 'tá suave' });
        next();
    });

    app.get('importer', importer);

    app.post('users/signup', users.signUp);
    app.post('users/auth', users.auth);
    app.get('packs', filter, packs.getAll);
    app.get('packs/:id/open', filter, packs.open);
    app.get('clubs', filter, clubs.getAll);
    app.get('squads', filter, squads.getAll);
    app.post('squads', filter, squads.create);
    app.put('mysquad/players/exclude', filter, squads.update);
    app.get('mysquad', filter, squads.getByUser);
};