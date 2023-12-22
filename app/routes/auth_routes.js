const AuthenticateController = require('../controllers/authentication/authenticate_controller');
const { auth } = require('../middleware/authenticated');

module.exports = function (app, db) {
    app.post('/register', (req, res) => AuthenticateController.register(req, res));
    app.post('/login', (req, res) => AuthenticateController.logIn(req, res));
    app.post('/logout', auth, (req, res) => AuthenticateController.logOut(req, res));
};