const express = require("express")
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const { getUser } = require('./auth');
const FoodListModel = require('../schema/foodListSchema');
const authorization = require('../middleware/authorization');
const UserModel = require('../schema/userSchema');
const fromUnixTime = require('date-fns/fromUnixTime');
const startOfDay = require('date-fns/startOfDay');
const getUnixTime = require('date-fns/getUnixTime');
const format = require('date-fns/format');
const groupBy = require('lodash.groupby');


router.get("/getuserReport", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    try {
        const lastWeekStartDate = getUnixTime(startOfDay(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)));
        const lastSevenDaysData = await FoodListModel.find({ userId, addedDate: { $gte: lastWeekStartDate } });
        const groupedEntry = lastSevenDaysData.reduce((hashMap, item) => {
            const key = format(fromUnixTime(item.addedDate), 'dd:MM:YYY');
            const value = hashMap[key] || 0;

            hashMap[key] = value + Number(item.consumedCalories);
            return hashMap;
        }, {});
        res.status(200).send(groupedEntry);
        return;
    } catch (e) {
        logger.error('getuserReport: Something went wrong', e);
        res.status(404).send('Bad request!');
        return;
    }
});


router.get("/getAdminReport", authorization(['admin']), async (req, res, next) => {
    const lastWeekStartDate = getUnixTime(startOfDay(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)));
    const prevWeekStartDate = getUnixTime(startOfDay(new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)));
    try {
        const lastSevenDaysData = await FoodListModel.find({ addedDate: { $gte: lastWeekStartDate } });
        const groupedByDate = lastSevenDaysData.reduce((hashMap, item) => {
            const key = format(fromUnixTime(item.addedDate), 'dd:MM:YYY');
            const value = hashMap[key] || [];
            hashMap[key] = [...value, item];
            return hashMap;
        }, {});

        const avgCalForLastSevendays = Object.keys(groupedByDate).map((dateKey) => {
            const dayItems = groupedByDate[dateKey];
            const groupedByUser = groupBy(dayItems, ['userId']);
            const allUsersCalList = Object.keys(groupedByUser).map(userKey => {
                const singleUserEntry = groupedByUser[userKey];
                const totalCal = singleUserEntry.reduce((re, item) => {
                    return re + Number(item.consumedCalories);
                }, 0);
                return totalCal;
            }, 0);
            const avgCaloriesAddPerDay = allUsersCalList.reduce((cal, item) => cal + item, 0) / allUsersCalList.length;
            return {
                date: dateKey,
                value: avgCaloriesAddPerDay
            };
        });

        const prevLastSevenDaysData = await FoodListModel.find({ addedDate: { $gte: prevWeekStartDate, $lt: lastWeekStartDate } });

        const result = {
            avgCalForLastSevendays,
            lastSevenDaysEntries: lastSevenDaysData.length,
            weekBeforeLastSevenDaysEntries: prevLastSevenDaysData.length,
        }
        res.status(200).send(result);
        return;
    } catch (e) {
        logger.error('getfoodEntry: Something went wrong', e);
        res.status(404).send('Bad request!');
        return;
    }
});


module.exports = router