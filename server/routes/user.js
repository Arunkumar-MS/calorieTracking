const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const UserModel = require('../schema/userSchema');
const AuthModel = require('../schema/authSchema');
const { body, validationResult } = require('express-validator');



router.post("/addUser", body('name').isString(), body('emailId').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const data = {
        ...req.body,
    }
    try {
        console.log(req.body.emailId);
        const user = await UserModel.find({emailId: req.body.emailId});
        console.log(user);
        if(user.length) {
            return res.status(200).json({ status: 406, message: 'This user already exist! Please try different user'});
        }

        const newUser = new UserModel({...data});
        console.log('newUser', newUser);
        console.log('data', data);
        const addedUser = await newUser.save();
        console.log('addedUser', addedUser);
        const token = jwt.sign({userid: ObjectId(addedUser._id), emailId: addedUser.emailId }, 'n4_8$##');
        console.log('token', token);
        const auth = new AuthModel({userId: ObjectId(addedUser._id), token });
        console.log('request', {userId: ObjectId(addedUser._id), token })
        console.log('token', auth);
        const addedToken = await auth.save();
        console.log('addedToken', addedToken);
        return res.status(200).json({token: addedToken.token, ...data});
    } catch(e) {
        logger.error('Error while adding new user in AddUser', e);
        return res.status(400).json({message: 'Somthing went wrong while adding new user!'});
    }
});


module.exports = {
    userRouter: router,
}