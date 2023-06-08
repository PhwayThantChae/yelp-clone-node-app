'use strict';

const userHandlers = require("../controllers/userController");

module.exports = (app) => {
    app.route('/tasks').post(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register').post(userHandlers.register)
    app.route('/auth/sign_in').post(userHandlers.sign_in)
}