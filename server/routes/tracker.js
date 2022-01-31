const express = require("express")
const router = express.Router();
const mongoose = require('mongoose');
const FoodListModel = require('../schema/foodListSchema');
const authorization = require('../middleware/authorization');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});


router.post("/addFood", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    const content = {
        userId,
        ...req.body,
    };
    try {
        var newFoodToSave = new FoodListModel({ ...content, userId });
        await newFoodToSave.save();
        const userFoodList = await FoodListModel.find({ userId });
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        res.status(404).send('Bad request!');
        return;
    }
});



router.post("/addOtherUserFoodEntry", authorization(['admin']), async (req, res, next) => {
    try {
        var newFoodToSave = new FoodListModel({ ...req.body });
        await newFoodToSave.save();
        const userFoodList = await FoodListModel.find({});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
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
        const userFoodList = await FoodListModel.find({});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        res.status(404).send('Bad request!');
        return;
    }
});



router.post("/deleteUserFoodEntry", authorization(['admin']), async (req, res, next) => {
    const content = {
        ...req.body,
    };
    const { userId } = req.body;
    try {
        await FoodListModel.remove({ userId }, content);
        const userFoodList = await FoodListModel.find({});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        res.status(404).send('Bad request!');
        return;
    }
});




router.get("/getfoodEntry", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    try {
        const userFoodList = await FoodListModel.find({ userId });
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        res.status(404).send('Bad request!');
        return;
    }
});


router.get("/getAllUserfoodEntry", authorization(['admin']), async (req, res, next) => {
    try {
        const userFoodList = await FoodListModel.find({});
        res.status(200).send(userFoodList);
        return;
    } catch (e) {
        res.status(404).send('Bad request!');
        return;
    }
});


module.exports = router