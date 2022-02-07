const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt");
var generator = require('generate-password');
const UserModel = require('../schema/userSchema');
const AuthModel = require('../schema/authSchema');

const addUser = async (data) => {
    const newUser = new UserModel({ ...data });
    const addedUser = await newUser.save();
    const token = jwt.sign({ userid: ObjectId(addedUser._id), emailId: addedUser.emailId }, process.env.PRIVATE_KEY);
    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const auth = new AuthModel({ userId: ObjectId(addedUser._id), token, password: hasedPassword });
    const addedToken = await auth.save();
    return { token: addedToken.token, ...data, password};
}


module.exports = {
    addUser,
}