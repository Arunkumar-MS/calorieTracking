const { getUserByToken } = require('../routes/auth');

const authenticate = async (req, res, next) => {
    const authToken = req.get('Authorization');
    if (!authToken) {
        res.status(401).send('Invalid token');
        return;
    }
    const user = await getUserByToken(authToken);
    if (!user) {
        res.status(401).send('Invalid token');
        return;
    }
    req.ctx = { user };
    next();
}

module.exports = authenticate;