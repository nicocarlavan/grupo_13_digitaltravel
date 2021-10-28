const User = require('../models/User');
const db = require('../database/models');


function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    db.User.findAll()
        .then(allUsers => {
            let userFromCookie = allUsers.find(oneUser => oneUser['email'] === emailInCookie)

            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            };
            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            };

            next();
        });
};

module.exports = userLoggedMiddleware;