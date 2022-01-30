const express = require("express")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');

router.get("/getUser", async (req, res) => {

    const authToken = req.get('Authorization');

    console.log('authToken', authToken);
    if (!authToken) {
        res.status(400).send('Invalid token');
        return
    }
    const dbClient = new MongoClient(MONGO_URI);
    try {
        await dbClient.connect();
        const userAuth = await getUserAuthInfo(authToken, dbClient);
        if (userAuth) {
            const user = await getUser(userAuth.userId, dbClient);
            if (user) {
             res.status(200).send(user);
             return
            }
        }
         res.status(400).send('Invalid user');
         return
    }
    catch (e) {
         res.status(500).send('Something went wrong');
         return;
    }
    finally {
        await dbClient.close();
    }
})

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
})


const getUserAuthInfo = async (token, dbClient) => {
    const database = dbClient.db('calorietacker');
    const auth = database.collection('auth');
    const query = { token };
    const user = await auth.findOne(query);
    return user;
}



const getUser = async (id, dbClient) => {
    const database = dbClient.db('calorietacker');
    const auth = database.collection('user');
    const query = { _id: ObjectId(id) };
    const user = await auth.findOne(query);
    return user;
}


const getUserByToken = async (authToken) => {
    const dbClient = new MongoClient(MONGO_URI);
    try {
        await dbClient.connect();
        const userAuth = await getUserAuthInfo(authToken, dbClient);
        if (userAuth) {
            const user = await getUser(userAuth.userId, dbClient);
            return user;
        }
        return null;

    } catch (e) {
        return null;
    }

    finally {
        await dbClient.close();
    }
}

module.exports = {
    authRouter: router,
    getUser,
    getUserByToken,
    getUserAuthInfo,
}