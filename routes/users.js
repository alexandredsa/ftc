const UserController = require('../controllers/UserController');

module.exports = {
    signUp: (req, res, next) => {
        const { name, login, password } = req.body;
        const userController = new UserController();
        userController.signUp(name, login, password)
            .then(() => res.render(201, ''))
            .catch(err => res.json(err.status, err.msg));
    },
    auth: (req, res, next) => {
        const { login, password } = req.body;
        const userController = new UserController();
        userController.auth(login, password)
            .then(user => res.json(200, user))
            .catch(err => res.json(err.status, err.msg));
    }
};