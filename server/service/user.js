const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const UserModel = require('../schema/userSchema');
const AuthModel = require('../schema/authSchema');

const addUser = async (data) => {
    const newUser = new UserModel({ ...data });
    const addedUser = await newUser.save();
    const token = jwt.sign({ userid: ObjectId(addedUser._id), emailId: addedUser.emailId }, 'n4_8$##');
    const auth = new AuthModel({ userId: ObjectId(addedUser._id), token });
    const addedToken = await auth.save();
    return { token: addedToken.token, ...data };
}


module.exports = {
    addUser,
}