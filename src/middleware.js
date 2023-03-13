export const saveSessionToLocal = (req, res, next) => {
    res.locals.loggedInUser = req.session.user;
    res.locals.loggedIn = Boolean(req.session.isLoggedIn);
    next();
};
