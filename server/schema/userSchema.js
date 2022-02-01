const mongoose=require('mongoose');
  
const UserSchema = new mongoose.Schema({
    name:String,
    role: { type: String, enum: ['admin', 'user'] },
    createdDate:String,
    calorieLimit:Number,
});
  
module.exports = mongoose.model('user', UserSchema, 'users');