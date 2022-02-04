const dbHandler = require('../dbHandler');
const userService = require('../../service/user');
const UserModel = require('../../schema/userSchema');
const AuthModel = require('../../schema/authSchema');

beforeAll(async () => {
    await dbHandler.connect();
});


afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('User ', () => {
    it('Should created correctly without any error', async () => {
        expect(async () => {
            await await userService.addUser({ name: 'arun', role: 'admin', createdDate: 23232322, calorieLimit: 2100, emailId: 'arun@aru.com' });
        })
            .not
            .toThrow();
    });

    it('Should exists after being created', async () => {
        const authUser = await userService.addUser({ name: 'arun', role: 'admin', createdDate: 23232322, calorieLimit: 2100, emailId: 'arun@aru.com' });
        const user = await UserModel.findOne({ name: 'arun' });
        const authSavedData = await AuthModel.findOne({ token: authUser.token });

        expect(authUser.name)
            .toBe(user.name);
        expect(authUser.token)
            .toBe(authSavedData.token);
    });
});

