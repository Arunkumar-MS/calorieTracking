const express = require("express");
const router = express.Router();
const UserModel = require('../schema/userSchema');
const userService = require('../service/user');

const { body, validationResult } = require('express-validator');

router.post("/addUser", body('name').isString(), body('role').isString().isIn(["admin","user"]), body('emailId').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const data = {
        ...req.body,
    }

    if(data.role === "admin" && req.ctx.user.role !== "admin") {
        return res.status(400).json({message: "You don not have permission to create this role "})
    }

    try {
        const user = await UserModel.find({emailId: req.body.emailId});
        if(user.length) {
            return res.status(200).json({ status: 406, message: 'This user already exist! Please try different user'});
        }
        const response = await userService.addUser(data);
        return res.status(200).json({...response});
    } catch(e) {
        logger.error('Error while adding new user in AddUser', e);
        return res.status(400).json({message: 'Somthing went wrong while adding new user!'});
    }
});

module.exports = {
    userRouter: router,
}