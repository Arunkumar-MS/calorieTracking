const express = require("express")
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const authorization = require('../middleware/authorization');
const UserModel = require('../schema/userSchema');

const trackerService = require('../service/tracker');


router.post("/addFood", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    const content = {
        userId,
        emailId: req.ctx.user['emailId'],
        ...req.body,
    };
    try {
        const response = await trackerService.addFood({ ...content, userId });
        return res.status(200).send(response);
    } catch (e) {
        logger.error('addFood: Something went wrong', e);
        res.status(404).send('Bad request!');
        return;
    }
});



router.post("/addOtherUserFoodEntry", authorization(['admin']), async (req, res, next) => {

    const { userId } = req.body;
    if (!ObjectId.isValid(userId)) {
        logger.warn('addOtherUserFoodEntry: invalid user id');
        return res.status(200).send({ statusCode: 400, message: 'Invalid user id!' });
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).send({ statusCode: 400, message: 'User not found!' });
        }
        const response = await trackerService.addOtherUserFoodEntry({ ...req.body, emailId: req.ctx.user.emailId });
        return res.status(200).send(response);
    } catch (e) {
        logger.error('addOtherUserFoodEntry: Something went wrong', e);
        return res.status(404).send('Bad request!');
    }
});



router.post("/editUserFoodEntry", authorization(['admin']), async (req, res, next) => {
    const { userId, _id } = req.body;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).send({ statusCode: 400, message: 'User not found!' });
        }
        const content = {
            ...req.body,
            _id,
            userId,
            emailId: user.emailId,
        };
        const response = await trackerService.editUserFoodEntry(content);
        return res.status(200).send(response);
    } catch (e) {
        logger.error('editUserFoodEntry: Something went wrong', e);
        return res.status(404).send('Bad request!');
    }
});



router.post("/deleteUserFoodEntry", authorization(['admin']), async (req, res, next) => {
    const { userId, _id } = req.body;
    try {
        const response = await trackerService.deleteUserFoodEntry({ userId, _id });
        return res.status(200).send(response);
    } catch (e) {
        logger.error('deleteUserFoodEntry: Something went wrong', e);
        return res.status(404).send('Bad request!');
    }
});




router.get("/getfoodEntry", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    try {
        const response = await trackerService.getfoodEntry(userId);
        return res.status(200).send(response);
    } catch (e) {
        logger.error('getfoodEntry: Something went wrong', e);
        return res.status(404).send('Bad request!');
    }
});


router.get("/getAllUserfoodEntry", authorization(['admin']), async (req, res, next) => {
    try {
        const response = await trackerService.getAllUserfoodEntry();
        return res.status(200).send(response);
    } catch (e) {
        logger.error('getAllUserfoodEntry: Something went wrong', e);
        return res.status(404).send('Bad request!');
    }
});


module.exports = router