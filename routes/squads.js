const SquadController = require('../controllers/SquadController');

module.exports = {
    getAll: (req, res, next) => {
        const squadController = new SquadController();
        squadController.getAll()
            .then(squads => res.json(200, squads))
            .catch(err => res.json(err.status, err.msg));
    },
    getByUser: (req, res, next) => {
        const squadController = new SquadController();
        const { user } = req.session;
        squadController.getByUser(user)
            .then(squad => res.json(200, squad))
            .catch(err => res.json(err.status, err.msg));
    },
    create: (req, res, next) => {
        const squadController = new SquadController();
        const { user } = req.session;
        const { club } = req.body;
        squadController.create(user, club)
            .then(squad => res.json(201, squad))
            .catch(err => res.json(err.status, err.msg));
    },
    update: (req, res, next) => {
        const squadController = new SquadController();
        const { players } = req.body;
        const { user } = req.session;
        squadController.update(players, user)
            .then(squad => res.json(201, squad))
            .catch(err => res.json(err.status, err.msg));
    }
};