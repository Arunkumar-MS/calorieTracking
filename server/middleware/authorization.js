

const authorization = (allowedRoles) => {
    return async (req, res, next) => {
        const user = req.ctx.user;
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).send('User does not have enough privilege to access this resource');
        }
        next();
    }
}

module.exports = authorization;