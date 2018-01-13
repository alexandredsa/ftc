const PackController = require('../controllers/PackController');

module.exports = {
    getAll: (req, res, next) => {
        const packController = new PackController();
        packController.getAll()
            .then(packs => res.json(200, packs))
            .catch(err => res.json(err.status, err.msg));
    },

    open: (req, res, next) => {
        const { id } = req.params;
        const packController = new PackController();
        packController.open(id)
            .then(packs => res.json(200, packs))
            .catch(err => res.json(err.status, err.msg));
    }
};