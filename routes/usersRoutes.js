const UsersController = require('../controllers/usersController');

module.exports = (app) => {

    // TRAZER DASOS
    app.get('/api/users/getAll', UsersController.getAll);

    // GUARDAR DADOS
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/login', UsersController.login);
}