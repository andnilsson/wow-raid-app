module.exports = (req, res, next) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(401).send({ error: 'You are not an admin!' });
    }
    next();
};