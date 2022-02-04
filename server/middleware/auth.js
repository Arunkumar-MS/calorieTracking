const { getUserByToken } = require('../routes/auth');
const { AUTH_HEADER_KEY }  = require('../constant');

const authenticate = async (req, res, next) => {
    const authToken = req.get(AUTH_HEADER_KEY);
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