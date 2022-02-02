const express = require("express")
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const { getUser } = require('./auth');
const FoodListModel = require('../schema/foodListSchema');
const authorization = require('../middleware/authorization');
const UserModel = require('../schema/userSchema');

router.post("/addFood", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    const content = {
        userId,
        ...req.body,
    };
    try {
        var newFoodToSave = new FoodListModel({ ...content, userId });
        await newFoodToSave.save();
        const userFoodList = await FoodListModel.find({ userId }).sort({ addedDate: -1 });
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        logger.error('addFood: Something went wrong',e);
        res.status(404).send('Bad request!');
        return;
    }
});



router.post("/addOtherUserFoodEntry", authorization(['admin']), async (req, res, next) => {
   
    const { userId } = req.body;
    if (!ObjectId.isValid(userId)) {
        logger.warn();('addOtherUserFoodEntry: invalid user id');
        res.status(200).send({ statusCode: 400, message: 'Invalid user id!'});
        return;
    }

    try {
        const user = await UserModel.findById(userId);
        if(!user){
            res.status(200).send({ statusCode: 400, message: 'User not found!'});
            return;
        }
        await FoodListModel({userId: req.body.userId});
        var newFoodToSave = new FoodListModel({ ...req.body });
        await newFoodToSave.save();
        const userFoodList = await FoodListModel.find({}).sort({addedDate: -1});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        console.log(e)
        logger.error('addOtherUserFoodEntry: Something went wrong',e);
        res.status(404).send('Bad request!');
        return;
    }
});



router.post("/editUserFoodEntry", authorization(['admin']), async (req, res, next) => {
    const content = {
        ...req.body,
    };
    const { userId, _id } = req.body;
    try {
        await FoodListModel.findOneAndUpdate({ _id, userId }, content);
        const userFoodList = await FoodListModel.find({}).sort({addedDate: -1});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        logger.error('editUserFoodEntry: Something went wrong',e);
        res.status(404).send('Bad request!');
        return;
    }
});



router.post("/deleteUserFoodEntry", authorization(['admin']), async (req, res, next) => {
    const { userId, _id } = req.body;
    try {
        await FoodListModel.remove({ userId, _id });
        const userFoodList = await FoodListModel.find({}).sort({addedDate: -1});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        logger.error('deleteUserFoodEntry: Something went wrong',e);
        res.status(404).send('Bad request!');
        return;
    }
});




router.get("/getfoodEntry", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    try {
        const userFoodList = await FoodListModel.find({ userId }).sort({ addedDate: -1 });
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        logger.error('getfoodEntry: Something went wrong',e);
        res.status(404).send('Bad request!');
        return;
    }
});


router.get("/getAllUserfoodEntry", authorization(['admin']), async (req, res, next) => {
    try {
        const userFoodList = await FoodListModel.find({}).sort({addedDate: -1});;
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        logger.error('getAllUserfoodEntry: Something went wrong',e);
        res.status(404).send('Bad request!');
        return;
    }
});


module.exports = router