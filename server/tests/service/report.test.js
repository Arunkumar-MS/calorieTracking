const dbHandler = require('../dbHandler');
const ObjectId = require('mongodb').ObjectId;
const trackerService = require('../../service/tracker');
const reportService = require('../../service/report');
const FoodListModel = require('../../schema/foodListSchema');
const getUnixTime = require('date-fns/getUnixTime');
const startOfDay = require('date-fns/startOfDay');

let userId;

beforeAll(async () => {
    await dbHandler.connect();
});


afterEach(async () => {
    userId = new ObjectId();
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

const inputData = {
    userId: userId,
    name: 'sadfsdf',
    consumedWeightGrams: '234',
    consumedCalories: Math.round(Math.random() * 400),
    consumedQty: '34',
    calories: '343',
    imageUrl: 'http://asdasd.cp,',
    servingUnit: 23,
    emailId: 'demo@demo.com'
};

const randNumber = () => Math.round(Math.random() * 400);

describe('Report', () => {
    describe('getuserReport', () => {
        it('Should get correct user report', async () => {
            await insertLastSevenDayData(0);
            // Below exp will help to understand how we are calculating last 7th day
            // 1643996059 current date (Friday, February 4, 2022 11:04:19 PM GMT+05:30)
            // 1643394600 previous 7th day date (Saturday, January 29, 2022 12:00:00 AM GMT+05:30)
            const records = await FoodListModel.find();
            const expectedTotalCal = records.reduce((r, c) => r + Number(c.consumedCalories), 0);
            const result = await reportService.getuserReport(userId);
            const actualactualCal = Object.keys(result).reduce((r, key) => r + result[key], 0);
            expect(expectedTotalCal).toBe(actualactualCal);
        });
    });

    describe('getAdminReport', () => {
        it('Should get correct Admin report', async () => {
            await insertLastSevenDayData(0);
            await insertLastSevenDayData(6);
            const result = await reportService.getAdminReport();
            expect(5).toBe(result.avgCalForLastSevendays.length);
            expect(6).toBe(result.lastSevenDaysEntries);
            expect(4).toBe(result.weekBeforeLastSevenDaysEntries);
        });
    });
});


const insertLastSevenDayData = async (day = 0) => {
    await trackerService.addFood({ ...inputData, consumedCalories: randNumber(), addedDate: getUnixTime(new Date()) });
    await trackerService.addFood({ ...inputData, consumedCalories: randNumber(), addedDate: getUnixTime(new Date(Date.now() - (1 + day) * 24 * 60 * 60 * 1000)) });
    await trackerService.addFood({ ...inputData, consumedCalories: randNumber(), addedDate: getUnixTime(new Date(Date.now() - (2 + day) * 24 * 60 * 60 * 1000)) });
    await trackerService.addFood({ ...inputData, consumedCalories: randNumber(), addedDate: getUnixTime(new Date(Date.now() - (3 + day) * 24 * 60 * 60 * 1000)) });
    await trackerService.addFood({ ...inputData, consumedCalories: randNumber(), addedDate: getUnixTime(startOfDay(new Date(Date.now() - (6 + day) * 24 * 60 * 60 * 1000))) }); // 7th day
}

