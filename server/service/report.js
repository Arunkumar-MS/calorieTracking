const FoodListModel = require('../schema/foodListSchema');
const fromUnixTime = require('date-fns/fromUnixTime');
const startOfDay = require('date-fns/startOfDay');
const getUnixTime = require('date-fns/getUnixTime');
const format = require('date-fns/format');
const groupBy = require('lodash.groupby');

const getuserReport = async (userId, days = 7) => {
    const day = days - 1;
    const lastWeekStartDate = getUnixTime(startOfDay(new Date(Date.now() - day * 24 * 60 * 60 * 1000)));
    const lastSevenDaysData = await FoodListModel.find({ userId, addedDate: { $gte: lastWeekStartDate } });
    const groupedEntry = lastSevenDaysData.reduce((hashMap, item) => {
        const key = format(fromUnixTime(item.addedDate), 'dd:MM:YYY');
        const value = hashMap[key] || 0;

        hashMap[key] = value + Number(item.consumedCalories);
        return hashMap;
    }, {});
    return groupedEntry;
}


const getAdminReport = async (days = 7) => {
    const tillStartOfLastweekday = days - 1;
    const tillPrevLastWeekDate = (days * 2) - 1;
    
    const lastWeekStartDate = getUnixTime(startOfDay(new Date(Date.now() - tillStartOfLastweekday * 24 * 60 * 60 * 1000)));
    const prevWeekStartDate = getUnixTime(startOfDay(new Date(Date.now() - tillPrevLastWeekDate * 24 * 60 * 60 * 1000)));
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

    return result;
}

module.exports = {
    getuserReport,
    getAdminReport,
}