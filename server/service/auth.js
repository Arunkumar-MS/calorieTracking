const ObjectId = require('mongodb').ObjectId;
const UserModel = require('../schema/userSchema');
const AuthModel = require('../schema/authSchema');

const getUser = async (req, res) => {
    const authToken = req.get('Authorization');
    if (!authToken) {
        logger.warn('Invalid token');
        return res.status(400).send('Invalid token');
    }

    try {
        const userAuth = await getUserAuthInfo(authToken);
        if (userAuth) {
            const user = await getUser(userAuth.userId);
            if (user) {
                res.status(200).send(user);
                return
            }
        }
        logger.warn('Invalid user');
        return res.status(400).send('Invalid user');
    }
    catch (e) {
        logger.error('Something went wrong', e);
        return res.status(500).send('Something went wrong');
    }
}

const login = async (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.status(400).send('Invalid token');
        return;
    }
    const user = await getUserByToken(token)
    if (user) {
        res.status(200).send(user)
        return;
    } else {
        return res.status(400).send('Invalid token');
    }
}


const getUserAuthInfo = async (token) => {
    const user = await AuthModel.findOne({ token });
    return user;
}


const getUser = async (id) => {

    const query = { _id: ObjectId(id) };
    const user = await UserModel.findOne(query);
    return user;
}


const getUserByToken = async (authToken) => {
    try {
        const userAuth = await getUserAuthInfo(authToken);
        if (userAuth) {
            const user = await getUser(userAuth.userId);
            return user;
        }
        return null;

    } catch (e) {
        return null;
    }
}


module.exports = {
    login,
    getUser,
    getUserByToken,
    getUserAuthInfo,
}