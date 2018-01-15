const ClubController = require('../controllers/ClubController');

module.exports = {
    getAll: (req, res, next) => {
        const clubController = new ClubController();
        const { query } = req;
        clubController.getAll(query)
            .then(clubs => res.json(200, clubs))
            .catch(err => res.json(err.status, err.msg));
    }
};