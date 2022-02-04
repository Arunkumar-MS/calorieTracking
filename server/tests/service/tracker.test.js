const dbHandler = require('../dbHandler');
const ObjectId = require('mongodb').ObjectId;
const trackerService = require('../../service/tracker');
const FoodListModel = require('../../schema/foodListSchema');
const getUnixTime = require('date-fns/getUnixTime');

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

const addedDate = getUnixTime(new Date());
const data = {
    addedDate,
    userId: userId,
    name: 'sadfsdf',
    consumedWeightGrams: '234',
    consumedCalories: '234',
    consumedQty: '34',
    calories: '343',
    imageUrl: 'http://asdasd.cp,',
    servingUnit: 23,
    emailId: 'demo@demo.com'
};

describe('Tracker', () => {
    describe('addFood', () => {
        it('Should created correctly without any error', async () => {
            expect(async () => {
                await trackerService.addFood({ ...data, name: 'demo' });
            })
                .not
                .toThrow();
        });

        it('Should exists after being created', async () => {
            const userFoodEntry = await trackerService.addFood({ ...data, name: 'demoTest' });
            const entry = await FoodListModel.findOne({ name: 'demoTest' });
            expect(userFoodEntry.length)
                .toBe(2);
            expect(entry.name)
                .toBe('demoTest');
        });
    });

    describe('AddOtherUserFoodEntry, for other user and get all other users data', () => {

        it('Should created correctly without any error', async () => {
            expect(async () => {

                await trackerService.addOtherUserFoodEntry({ ...data, userId: new ObjectId(), name: 'AddOtherUserFoodEntry1' });
            })
                .not
                .toThrow();
        });

        it('Should exists after being created', async () => {
            const id = new ObjectId();
            const userFoodEntry = await trackerService.addOtherUserFoodEntry({ ...data, userId: id, name: 'AddOtherUserFoodEntry2' });
            expect(userFoodEntry[1].addedDate).toBe(addedDate);
            const entry = await FoodListModel.findOne({ userId: id });
            expect(userFoodEntry.length)
                .toBe(2);
            expect(entry.name)
                .toBe('AddOtherUserFoodEntry2');
        });
    });

    describe('editUserFoodEntry', () => {

        it('Should created edit correctly without any error', async () => {

            await trackerService.addFood({ ...data, name: 'demoTest' });
            const entry = await FoodListModel.findOne({ name: 'demoTest' });

            expect(async () => {

                await trackerService.editUserFoodEntry({ ...data, name: 'AddOtherUserFoodEntry1', _id: entry._id, userId: entry.userId });
            })
                .not
                .toThrow();
        });

        it('Should exists after being edited', async () => {

            await trackerService.addFood({ ...data, name: 'demoTest' });
            const prevAddedEntry = await FoodListModel.findOne({ name: 'demoTest' });
            await trackerService.editUserFoodEntry({ ...data, name: 'AddOtherUserFoodEntry1', _id: prevAddedEntry._id, userId: prevAddedEntry.userId });
            const updatedEntry = await FoodListModel.findOne({ userId: prevAddedEntry.userId, _id: prevAddedEntry._id });
            expect(prevAddedEntry.name)
                .toBe('demoTest');
            expect(updatedEntry.name)
                .toBe('AddOtherUserFoodEntry1');
        });
    });


    describe('deleteUserFoodEntry', () => {

        it('Should created edit correctly without any error', async () => {

            await trackerService.addFood({ ...data, name: 'demoTest' });
            const entry = await FoodListModel.findOne({ name: 'demoTest' });

            expect(async () => {
                await trackerService.deleteUserFoodEntry({ _id: entry._id, userId: entry.userId });
            })
                .not
                .toThrow();
        });

        it('Should not exists after being deleted', async () => {
            await trackerService.addFood({ ...data, name: 'demoTest' });
            const prevAddedEntry = await FoodListModel.findOne({ name: 'demoTest' });
            await trackerService.deleteUserFoodEntry({ userId: prevAddedEntry.userId, _id: prevAddedEntry._id });
            const deletedEntryFind = await FoodListModel.findOne({ userId: prevAddedEntry.userId, _id: prevAddedEntry._id });
            expect(prevAddedEntry).toBeDefined();
            expect(deletedEntryFind).toBeNull();
        });
    });
});



const createFoodEntrys = async () => {
    await FoodListModel.save({
        userId: userId,
        name: 'sadfsdf',
        consumedWeightGrams: '234',
        consumedCalories: '234',
        consumedQty: '34',
        calories: '343',
        imageUrl: 'http://asdasd.cp,',
        addedDate: getUnixTime(new Date()),
        servingUnit: 23,
        emailId: 'demo@demo.com'
    });
};

