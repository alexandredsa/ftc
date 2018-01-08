const importer = require('./importer');
module.exports = (app) => {
    app.get('health', (req, res, next) => {
        res.json(200, { status: 'tá suave'});
        next();
    });

    app.get('importer', importer);
};