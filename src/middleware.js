const middleware = {
    saveSessionToLocal(req, res, next) {
        res.locals.loggedIn = Boolean(req.session.isLoggedIn);
        res.locals.loggedInUser = req.session.loggedInUSer;
        next();
    },
};

module.exports = middleware;
