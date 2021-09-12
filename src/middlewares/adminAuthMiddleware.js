function adminAuthMiddleware(req, res, next) {
    if (!req.session.userLogged || req.session.userLogged.role != 9) {
        return res.redirect('/');
    }
    next();
};

module.exports = adminAuthMiddleware;