const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const UserModel = require('../schema/userSchema');
const AuthModel = require('../schema/authSchema');


router.get("/getUser", async (req, res) => {
    const authToken = req.get('Authorization');
    if (!authToken) {
        logger.warn('Invalid token');
        res.status(400).send('Invalid token');
        return
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
         res.status(400).send('Invalid user');
         return
    }
    catch (e) {
        logger.error('Something went wrong',e);
         res.status(500).send('Something went wrong');
         return;
    }
});

router.post("/login", async (req, res) => {
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
});


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
    authRouter: router,
    getUser,
    getUserByToken,
    getUserAuthInfo,
}