const FoodListModel = require('../schema/foodListSchema');

const addFood = async (foodDetials) => {
    const { sortType = -1, userId } = foodDetials;
    var newFoodToSave = new FoodListModel({ ...foodDetials });
    await newFoodToSave.save();
    const userFoodList = await getfoodEntry(userId, sortType);
    return userFoodList;
}


const addOtherUserFoodEntry = async (foodDetails) => {
    const { sortType = -1 } = foodDetails;
    await FoodListModel({ ...foodDetails });
    var newFoodToSave = new FoodListModel({ ...foodDetails });
    await newFoodToSave.save();
    const userFoodList = await FoodListModel.find({}).sort({ addedDate: sortType });
    return userFoodList;
}


const editUserFoodEntry = async (updateUserEntry) => {
    const { userId, _id } = updateUserEntry;
    const { sortType = -1 } = updateUserEntry;
    await FoodListModel.findOneAndUpdate({ _id, userId }, updateUserEntry);
    const userFoodList = await getAllUserfoodEntry(sortType);
    return userFoodList;
}



const deleteUserFoodEntry = async (deleteFoodDetail) => {
    const { userId, _id } = deleteFoodDetail;
    const { sortType = -1 } = deleteFoodDetail;
    await FoodListModel.remove({ userId, _id });
    const userFoodList = await FoodListModel.find({}).sort({ addedDate: sortType });
    return userFoodList;

}

const getfoodEntry = async (userId, sortType = -1) => {
    const userFoodList = await FoodListModel.find({ userId }).sort({ addedDate: sortType });
    return userFoodList;
}


const getAllUserfoodEntry = async (sortType = -1) => {
    return await FoodListModel.find({}).sort({ addedDate: sortType });;
}


module.exports = {
    addFood,
    getAllUserfoodEntry,
    getfoodEntry,
    addOtherUserFoodEntry,
    editUserFoodEntry,
    deleteUserFoodEntry
}