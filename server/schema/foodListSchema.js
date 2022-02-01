const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
  
const FoodListSchema = new mongoose.Schema({
    userId:ObjectId,
    name:String,
    consumedWeightGrams:String,
    consumedCalories:String,
    consumedQty:String,
    calories:String,
    imageUrl: String,
    addedDate: Number,
    servingUnit: String,
});
  
module.exports = mongoose.model('foodList', FoodListSchema, 'userFoodList');